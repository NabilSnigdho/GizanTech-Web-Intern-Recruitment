import { type DeepPartial } from "flowbite-react";
import { type FlowbiteBreadcrumbItemTheme } from "flowbite-react/lib/esm/components/Breadcrumb/BreadcrumbItem";
import { type FlowbiteSidebarTheme } from "flowbite-react/lib/esm/components/Sidebar";

export const theme = {
	sidebar: {
		root: {
			base: "w-64 flex-shrink-0 lt-lg:h-full lt-lg:absolute lt-lg:z-10 dark",
			inner:
				"h-full overflow-y-auto overflow-x-hidden py-4 px-3 bg-slate-800",
		},
		collapse: {
            label: {
                icon: 'h-6 w-6 -rotate-90'
            }
		},
	} satisfies DeepPartial<FlowbiteSidebarTheme>,
	breadcrumbItem: {
		chevron: "mx-1 h-4 w-4 text-gray-300 group-first:hidden md:mx-2",
		href: { on: "text-blue-600", off: "" },
	} satisfies DeepPartial<FlowbiteBreadcrumbItemTheme>,
};
