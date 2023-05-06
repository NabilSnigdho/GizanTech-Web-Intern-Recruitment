import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import { Avatar, Dropdown, Sidebar } from "flowbite-react";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import {
	FaBars,
	FaBug,
	FaClone,
	FaDesktop,
	FaEdit,
	FaHome,
	FaLaptop,
	FaPaw,
	FaRegChartBar,
	FaRegEnvelope,
	FaSitemap,
	FaTable,
	FaWindows,
} from "react-icons/fa";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { theme } from "./theme";

const cls = (...args: (string | boolean)[]) =>
	args.map((x) => x ?? "").join(" ");

const data = [
	{ date: "Jan 1", a: 17, b: 82 },
	{ date: "Jan 2", a: 74, b: 23 },
	{ date: "Jan 3", a: 6, b: 66 },
	{ date: "Jan 4", a: 39, b: 9 },
	{ date: "Jan 5", a: 20, b: 119 },
	{ date: "Jan 6", a: 85, b: 6 },
	{ date: "Jan 7", a: 7, b: 9 },
];

const Progress = ({ progress }: { progress: number }) => (
	<div className="w-full bg-gray-200 h-2.5 dark:bg-gray-700 shadow-inner">
		<div className="bg-teal-500 h-2.5" style={{ width: `${progress}%` }}></div>
	</div>
);

function App() {
	const [hideSidebar, setHideSidebar] = useState(false);
	return (
		<div className="text-slate-500">
			<div className="flex bg-gray-200">
				<a
					className={cls(
						"text-xl w-56 h-14 flex-shrink-0 px-4 bg-slate-700 text-white flex items-center",
						hideSidebar && "hidden"
					)}
				>
					<span className="border p-1 rounded-full mr-2">
						<FaPaw />
					</span>
					<span>Gentelella Alela!</span>
				</a>
				<button
					className="px-3 h-14"
					onClick={() => {
						setHideSidebar(!hideSidebar);
					}}
				>
					<FaBars className="h-6 w-6" />
				</button>
				<div className="flex flex-grow items-center gap-3 px-3 lt-lg:hidden">
					<button className="ml-auto relative">
						<FaRegEnvelope className="h-6 w-6" />
						<span
							color="teal"
							className="absolute rounded px-1 bg-teal-500 text-white text-xs -top-1 -right-1"
						>
							6
						</span>
					</button>
					<span className="flex items-center">
						<Avatar
							img="/person.jpg"
							rounded={true}
							className="mr-2"
							size="sm"
						/>
						<Dropdown label="John Doe" inline size="sm"></Dropdown>
					</span>
				</div>
			</div>
			<div className="flex items-stretch relative min-h-screen">
				<Sidebar theme={theme.sidebar} className={hideSidebar ? "hidden" : ""}>
					<Sidebar.Items>
						<Sidebar.ItemGroup>
							<Avatar
								img="/person.jpg"
								rounded={true}
								bordered={true}
								color="gray"
								size="lg"
							>
								<div className="space-y-1 font-medium dark:text-white">
									<div>Welcome,</div>
									<div>John Doe</div>
								</div>
							</Avatar>
							<h2 className="pt-5 ml-3 uppercase font-bold text-sm">General</h2>
							<Sidebar.Collapse
								icon={FaHome}
								label="Home"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={FaEdit}
								label="Forms"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={FaDesktop}
								label="UI Elements"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={FaTable}
								label="Tables"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={FaRegChartBar}
								label="Data Presentation"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={FaClone}
								label="Layouts"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<h2 className="pt-5 ml-3 uppercase font-bold text-sm">Live on</h2>
							<Sidebar.Collapse
								icon={FaBug}
								label="Additional Pages"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={FaWindows}
								label="Extras"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Collapse
								icon={FaSitemap}
								label="Multilevel Menu"
								theme={theme.sidebar.collapse}
							></Sidebar.Collapse>
							<Sidebar.Item href="#" icon={FaLaptop} theme={theme.sidebar.item}>
								Landing Page
							</Sidebar.Item>
						</Sidebar.ItemGroup>
					</Sidebar.Items>
				</Sidebar>
				<main className="p-5 flex flex-col gap-5 bg-zinc-100 border-zinc-200 border-t-2 min-w-0 flex-grow">
					<div className="bg-white">
						<h2 className="text-3xl mb-2 p-5 border-b-2 flex">
							Network Activities
							<span className="text-2xl">Graph title sub-title</span>
							<DateRangePicker
								value={[new Date("April 7, 2023"), new Date("May 6, 2023")]}
								className="ml-auto text-2xl"
							/>
						</h2>
						<div className="flex flex-col lg:flex-row gap-5">
							<div className="overflow-x-auto flex-shrink">
								<AreaChart
									width={800}
									height={300}
									data={data}
									margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
								>
									<XAxis dataKey="date" />
									<YAxis />
									<CartesianGrid />
									<Tooltip />
									<Area
										type="monotone"
										dataKey="a"
										fill="rgba(38, 185, 154, 0.38)"
									/>
									<Area
										type="monotone"
										dataKey="b"
										fill="rgba(3, 88, 106, 0.38)"
									/>
								</AreaChart>
							</div>
							<div className="flex-grow flex-shrink-0 p-5">
								<h2 className="text-lg border-b-2 pb-4 mb-3">Top Campaign Performance</h2>
								<p className="mb-4">
									Facebook Campaign
									<Progress progress={80} />
								</p>
								<p className="mb-4">
									Twitter Campaign
									<Progress progress={60} />
								</p>
								<p className="mb-4">
									Conventional Media
									<Progress progress={40} />
								</p>
								<p className="mb-4">
									Bill boards
									<Progress progress={50} />
								</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
