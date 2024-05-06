// Any UI embed into loading.tsx will be embedded as part of the static file, // sent first. 
// Then, the rest of the dynamihttps://chat.openai.com/c content will be streamed from the server to the client.

import DashboardSkeleton from "@/app/ui/skeletons";


export default function Loading() {
    return <DashboardSkeleton />
}