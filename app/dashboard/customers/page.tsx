import { fetchCustomers, fetchInvoiceByCustomer, fetchInvoiceById } from "@/app/lib/data";
import { FormattedCustomersTable } from "@/app/lib/definitions";
import CustomersTable from "@/app/ui/customers/table"
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Customers',
}

interface totalInvoices {
    totalInvoices: number;
    totalPending: number;
    totalPaid: number;
}

export default async function Page() {
    const customers = await fetchCustomers();

    async function sumInvoices(customerId: string): Promise<totalInvoices> {
        let total_invoices: totalInvoices = {
            totalInvoices: 0,
            totalPending: 0,
            totalPaid: 0
        };

        const invoices = await fetchInvoiceByCustomer(customerId);
        for (const invoice of invoices) {
            if (invoice.status === 'pending') {
                total_invoices.totalPending += invoice.amount;
            } else {
                total_invoices.totalPaid += invoice.amount;
            }
            total_invoices.totalInvoices += invoice.amount;
        }

        return total_invoices;
    }

    const formattedCustomers: FormattedCustomersTable[] = await Promise.all(customers.map(async (customer) => {
        const total_invoices = await sumInvoices(customer.id);
        return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            image_url: customer.image_url,
            total_invoices: total_invoices.totalInvoices,
            total_pending: total_invoices.totalPending.toString(),
            total_paid: total_invoices.totalPaid.toString(),
        }
    }));

    return (
        // <p>Customers Page</p>
        <CustomersTable customers={formattedCustomers} />
    )
}