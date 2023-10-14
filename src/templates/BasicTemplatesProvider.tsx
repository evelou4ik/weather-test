'use client'

import {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

interface Props {
    children: ReactNode;
}

const BasicTemplateProvider = ({children}: Props) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </main>
    )
}

export default BasicTemplateProvider;