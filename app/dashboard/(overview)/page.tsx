import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page() {
    // const revenue = await fetchRevenue();
    // const {
    //     numberOfCustomers,
    //     numberOfInvoices,
    //     totalPaidInvoices,
    //     totalPendingInvoices,
    // } = await fetchCardData();

    // const [revenue, latestInvoices, cardData] = await Promise.all([
    //     fetchRevenue(),
    //     fetchLatestInvoices(),
    //     fetchCardData(),
    // ]);
    // const {
    //     numberOfCustomers,
    //     numberOfInvoices,
    //     totalPaidInvoices,
    //     totalPendingInvoices,
    // } = cardData;

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
                {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
                    <Card title="Pending" value={totalPendingInvoices} type="pending" />
                    <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                    <Card
                        title="Total Customers"
                        value={numberOfCustomers}
                        type="customers"
                    /> */}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <RevenueChart revenue={revenue} /> */}
                <Suspense fallback={<RevenueChartSkeleton />}>
                    {/* fallback 是还未加载时候的显示 */}
                    {/* Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). 
                You can wrap your dynamic components in Suspense */}
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}