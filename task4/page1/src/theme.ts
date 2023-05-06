import { type DeepPartial } from "flowbite-react";
import { type FlowbiteBreadcrumbItemTheme } from "flowbite-react/lib/esm/components/Breadcrumb/BreadcrumbItem";
import { type FlowbiteSidebarTheme } from "flowbite-react/lib/esm/components/Sidebar";

export const theme = {
	sidebar: {
		root: {
			base: "w-56 flex-shrink-0 lt-lg:h-full lt-lg:absolute lt-lg:z-10 dark",
			collapsed: {
				on: '',
				off: ''
			},
			inner:
				"h-full overflow-y-auto overflow-x-hidden py-4 px-3 bg-slate-700 text-sm text-white",
		},
		collapse: {
			button: 'group flex w-full items-center rounded-lg p-2 text-xm font-normal text-white transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
			icon: {
				base: 'h-4 w-4 text-white'
			},
			label: {
				icon: 'h-4 w-4'
			}
		},
		item: {
			icon: {
				base: 'h-4 w-4 text-white'
			}
		}
	} satisfies DeepPartial<FlowbiteSidebarTheme>,
	breadcrumbItem: {
		chevron: "mx-1 h-4 w-4 text-gray-300 group-first:hidden md:mx-2",
		href: { on: "text-blue-600", off: "" },
	} satisfies DeepPartial<FlowbiteBreadcrumbItemTheme>,
};
