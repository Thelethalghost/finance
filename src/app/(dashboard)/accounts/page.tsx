"use client";
import { Loader2, Plus } from "lucide-react"

import { useNewAccount } from "@/features/accounts/hooks/useNewAccounts"
import { useGetAccounts } from "@/features/accounts/api/usegetaccounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/useBulkDelete";

import { columns } from "./columns";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/Layout/dataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from "react";


const AccountsPage = () => {

  const newAccount = useNewAccount();
  const accountsQuery = useGetAccounts();
  const deleteAccounts = useBulkDeleteAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if(accountsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" /> 
          </CardHeader>
          <CardContent>
            <div className="h-[500px] flex items-center justify-center w-full">
              <Loader2 className="size-6 text-slate-300 animate-spin" /> 
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Accounts Page
          </CardTitle>
          <Button size={"sm"} onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="email"
            columns={columns}
            data={accounts}
            onDelete={(row) => { 
              const ids = row.map((r) => r.original.id);
              deleteAccounts.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountsPage