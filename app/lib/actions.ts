// mark all the exported functions within the file as server functions.
// These server functions can then be imported into Client and Server components
// making them extremely versatile.
'use server';

import { signIn } from '@/auth';
import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { exportTraceState } from 'next/dist/trace';
import { redirect } from 'next/navigation';
import z from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
};

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to create the invoice.',
    };
  }

  // clear this cache and trigger a new request to the server
  revalidatePath('dashboard/invoices');

  // redirect works by throwing an error, which would be caught by the catch block. To avoid this
  redirect('/dashboard/invoices'); // called outside of the try/catch block.
}

export async function deleteInvoice(id: string) {
  throw new Error('Not implemented');

  try {
    await sql`
      DELETE FROM invoices WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete the invoice.',
    };
  }

  revalidatePath('dashboard/invoices');
  return { message: 'Invoice deleted successfully.' };
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string, 
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update the invoice.',
    };
  }

  revalidatePath('dashboard/invoices');
  redirect('/dashboard/invoices');
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}