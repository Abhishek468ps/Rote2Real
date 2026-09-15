/* import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ThemeProvider } from "@/context/ThemeProvider";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ThemeProvider>
  );
}*/


import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}