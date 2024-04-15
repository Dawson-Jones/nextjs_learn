import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { invoices } from "@/app/lib/placeholder-data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from '@/app/ui/invoices/edit-form';
import { notFound } from "next/navigation";

export default async function Page({params}: {params: {id: string}}) {
    const id = params.id;
    const [invoice, customners] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ])

    if (!invoice) {
        notFound(); // The notFound function allows you to render the not-found file
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customners}/>
        </main>
    )
}