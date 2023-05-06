import { Avatar, Breadcrumb, Dropdown, Sidebar } from "flowbite-react";
import {
	FaGlobe,
	FaPlus,
	FaShoppingCart,
	FaTable,
	FaTag,
	FaUser,
} from "react-icons/fa";
import {
	MdAreaChart,
	MdBarChart,
	MdBlurLinear,
	MdBorderOuter,
	MdBubbleChart,
	MdDashboard,
	MdEdit,
	MdEventAvailable,
	MdExtension,
	MdFace,
	MdManageAccounts,
	MdMenu,
	MdOutlineImageAspectRatio,
	MdReceipt,
	MdSearch,
	MdSpaceDashboard,
	MdWarning,
	MdNotifications,
	MdSms,
} from "react-icons/md";
import { RiDragMove2Line } from "react-icons/ri";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { theme } from "./theme";
import { useState } from "react";

const cls = (...args: (string | boolean)[]) =>
	args.map((x) => x ?? "").join(" ");

const data: { x: number; "sin(x)": number; "cos(x)": number }[] = [];
for (let x = 0; x < 12; x += 0.2) {
	data.push({ x, "sin(x)": Math.sin(x), "cos(x)": Math.cos(x) });
}

function App() {
	const [hideSidebar, setHideSidebar] = useState(false);
	return (
		<div className="text-slate-600">
			<div className="flex bg-neutral-900 text-neutral-300">
				<a
					className={cls(
						"w-64 h-16 px-3 bg-slate-800 flex items-center",
						hideSidebar && "hidden"
					)}
				>
					<img src="/logo-icon.png" alt="homepage" className="px-2" />
					<img src="/logo-text.png" alt="matrix admin" />
				</a>
				<button
					className="px-5 h-16"
					onClick={() => {
						setHideSidebar(!hideSidebar);
					}}
				>
					<MdMenu className="h-6 w-6" />
				</button>
				<div className="flex flex-grow items-center lt-lg:hidden">
					<span className="px-5">
						<Dropdown label="Create New" inline></Dropdown>
					</span>
					<button className="px-5">
						<MdSearch className="h-6 w-6" />
					</button>
					<button className="ml-auto px-5">
						<MdNotifications className="h-6 w-6" />
					</button>
					<button className="px-5">
						<MdSms className="h-6 w-6" />
					</button>
					<Avatar img="/person.jpg" rounded={true} className="mx-5" />
				</div>
			</div>
			<div className="flex items-stretch relative">
				<Sidebar theme={theme.sidebar} className={hideSidebar ? "hidden" : ""}>
					<Sidebar.Items>
						<Sidebar.ItemGroup>
							<Sidebar.Item href="#" icon={MdDashboard}>
								Dashboard
							</Sidebar.Item>
							<Sidebar.Item href="#" icon={MdBarChart}>
								Charts
							</Sidebar.Item>
							<Sidebar.Item href="#" icon={MdBubbleChart}>
								Widgets
							</Sidebar.Item>
							<Sidebar.Item href="#" icon={MdBorderOuter}>
								Tables
							</Sidebar.Item>
							<Sidebar.Item href="#" icon={MdBlurLinear}>
								Full Width
							</Sidebar.Item>
							<Sidebar.Collapse
								icon={MdReceipt}
								label="Forms"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Item href="#" icon={MdOutlineImageAspectRatio}>
								Buttons
							</Sidebar.Item>
							<Sidebar.Collapse
								icon={MdFace}
								label="Icons"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Item href="#" icon={MdEdit}>
								Elements
							</Sidebar.Item>
							<Sidebar.Collapse
								icon={MdExtension}
								label="Addon"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={MdManageAccounts}
								label="Authentication"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={MdWarning}
								label="Errors"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
						</Sidebar.ItemGroup>
					</Sidebar.Items>
				</Sidebar>
				<main className="p-5 flex flex-col gap-5 bg-zinc-100 min-w-0 flex-grow">
					<div className="flex justify-between">
						<h1 className="text-lg font-bold mb-0">Dashboard</h1>
						<Breadcrumb className="text-xs">
							<Breadcrumb.Item theme={theme.breadcrumbItem} href="#">
								Home
							</Breadcrumb.Item>
							<Breadcrumb.Item theme={theme.breadcrumbItem}>
								Library
							</Breadcrumb.Item>
						</Breadcrumb>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 text-center text-white">
						<div className="p-3 bg-sky-500">
							<div className="mb-2">
								<MdDashboard className="h-10 w-10 mx-auto" />
							</div>
							Dashboard
						</div>
						<div className="p-3 bg-emerald-500 lg:col-span-2">
							<div className="mb-2">
								<MdAreaChart className="h-10 w-10 mx-auto" />
							</div>
							Charts
						</div>
						<div className="p-3 bg-amber-400">
							<div className="mb-2">
								<MdSpaceDashboard className="h-10 w-10 mx-auto" />
							</div>
							Widgets
						</div>
						<div className="p-3 bg-red-500">
							<div className="mb-2">
								<MdBorderOuter className="h-10 w-10 mx-auto" />
							</div>
							Tables
						</div>
						<div className="p-3 bg-blue-800">
							<div className="mb-2">
								<RiDragMove2Line className="h-10 w-10 mx-auto" />
							</div>
							Full Width
						</div>
						<div className="p-3 bg-red-500 lg:col-span-2">
							<div className="mb-2">
								<MdReceipt className="h-10 w-10 mx-auto" />
							</div>
							Forms
						</div>
						<div className="p-3 bg-blue-800">
							<div className="mb-2">
								<MdOutlineImageAspectRatio className="h-10 w-10 mx-auto" />
							</div>
							Buttons
						</div>
						<div className="p-3 bg-sky-500">
							<div className="mb-2">
								<MdEdit className="h-10 w-10 mx-auto" />
							</div>
							Elements
						</div>
						<div className="p-3 bg-emerald-500">
							<div className="mb-2">
								<MdEventAvailable className="h-10 w-10 mx-auto" />
							</div>
							Calendar
						</div>
						<div className="p-3 bg-amber-400">
							<div className="mb-2">
								<MdWarning className="h-10 w-10 mx-auto" />
							</div>
							Errors
						</div>
					</div>
					<div className="p-5 bg-white">
						<h2 className="text-lg mb-2">Site Analysis</h2>
						<h3 className="text-gray-400 mb-2">Overview of Latest Month</h3>
						<div className="flex flex-col lg:flex-row gap-5">
							<div className="overflow-x-auto flex-shrink">
								<LineChart
									width={800}
									height={300}
									data={data}
									margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
								>
									<XAxis
										dataKey="x"
										type="number"
										ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
									/>
									<YAxis />
									<CartesianGrid />
									<Tooltip />
									<Legend
										verticalAlign="top"
										layout="vertical"
										align="right"
										iconType="square"
										wrapperStyle={{ padding: ".75rem" }}
									/>
									<Line type="monotone" dataKey="sin(x)" stroke="#ee7951" />
									<Line type="monotone" dataKey="cos(x)" stroke="#4fb9f0" />
								</LineChart>
							</div>
							<div className="grid gap-x-5 gap-y-4 grid-cols-2 flex-grow flex-shrink-0 text-center text-white">
								{[
									[FaUser, "2540", "Total Users"],
									[FaPlus, "120", "New Users"],
									[FaShoppingCart, "656", "Total Shop"],
									[FaTag, "9540", "Total Orders"],
									[FaTable, "100", "Pending Orders"],
									[FaGlobe, "8540", "Online Orders"],
								].map(([Icon, num, name]) => (
									<div className="bg-neutral-700 p-5" key={name}>
										<Icon className="mx-auto mb-1" />
										<div className="font-bold mb-1">{num}</div>
										<div className="text-xs">{name}</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="grid gap-5 lg:grid-cols-2">
						<div className="p-5 bg-white">
							<h1 className="text-lg font-bold mb-0">Latest Posts</h1>
							<Avatar img="/person.jpg" rounded={true} className="py-3">
								<div className="font-bold mb-1">James Anderson</div>
								<div>
									Lorem Ipsum is simply dummy text of the printing and type
									setting industry.
								</div>
								<div className="flex items-center text-white gap-2 my-2">
									<button className="px-2 py-1 bg-sky-500">Edit</button>
									<button className="px-2 py-1 bg-emerald-500">Publish</button>
									<button className="px-2 py-1 bg-red-500">Delete</button>
								</div>
							</Avatar>
						</div>
						<div className="p-5 bg-white">
							<h1 className="text-lg font-bold mb-0">Chat Option</h1>
							<Avatar img="/person.jpg" rounded={true} className="py-3">
								<div className="font-bold mb-2">James Anderson</div>
								<div className="p-2 bg-gray-100 mb-1">
									Lorem Ipsum is simply dummy text of the printing and type
									setting industry.
								</div>
								<small>10:56 am</small>
							</Avatar>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
