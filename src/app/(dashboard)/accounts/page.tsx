"use client";
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { useNewAccount } from "@/features/accounts/hooks/useNewAccounts"
import { Plus } from "lucide-react"
import { columns } from "./columns";
import { DataTable } from "@/components/Layout/dataTable";
import { useGetAccounts } from "@/features/accounts/api/usegetaccounts";


const AccountsPage = () => {

  const newAccount = useNewAccount();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

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
            onDelete={() => { }}  // TODO: Add delete Button
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountsPage