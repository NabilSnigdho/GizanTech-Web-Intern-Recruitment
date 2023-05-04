import type { Exercise } from '$lib/data/schema';
import { stringify as CSVStringify } from 'csv-stringify/browser/esm/sync';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';

const headers = [
	{ label: 'ID', field: 'id' },
	{ label: 'Name', field: 'name' },
	{ label: 'Body Part', field: 'bodyPart' },
	{ label: 'Target', field: 'target' },
	{ label: 'Equipment', field: 'equipment' },
	{ label: 'GIF Url', field: 'gifUrl' }
] as { label: string; field: 'id' | 'name' | 'bodyPart' | 'target' | 'equipment' | 'gifUrl' }[];

const to2dArray = (items: Exercise[]) => [
	headers.map(({ label }) => label),
	...items.map((item) => headers.map(({ field }) => item[field]))
];

export const saveCSV = (items: Exercise[], destination: string) =>
	saveAs(
		new Blob([CSVStringify(to2dArray(items))], { type: 'text/csv;charset=utf-8' }),
		destination
	);

export const saveExcel = (items: Exercise[], destination: string) => {
	const wb = utils.book_new();
	const ws = utils.aoa_to_sheet(to2dArray(items));
	utils.book_append_sheet(wb, ws);
	writeFile(wb, destination);
};

export const savePdf = (items: Exercise[], destination: string) => {
	const doc = new jsPDF();
	autoTable(doc, {
		head: [headers.map(({ label }) => label)],
		body: items.map((item) => headers.map(({ field }) => item[field]))
	});
	doc.save(destination);
};
