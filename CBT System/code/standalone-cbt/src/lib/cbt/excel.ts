import ExcelJS from "exceljs";

export async function readWorkbook(file: File) {
  const workbook = new ExcelJS.Workbook();
  const arrayBuffer = await file.arrayBuffer();
  await workbook.xlsx.load(arrayBuffer as any);
  return workbook;
}

export function parseStudentSheet(workbook: ExcelJS.Workbook) {
  const sheet = workbook.worksheets[0];
  if (!sheet) return [];

  const rows: Array<{ matricNo: string; surname: string; firstName: string }> = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const matricNo = String(row.getCell(1).value ?? "").trim();
    const surname = String(row.getCell(2).value ?? "").trim();
    const firstName = String(row.getCell(3).value ?? "").trim();
    if (!matricNo || !surname || !firstName) return;
    rows.push({ matricNo, surname, firstName });
  });
  return rows;
}

export function parseQuestionSheet(workbook: ExcelJS.Workbook) {
  const sheet = workbook.worksheets[0];
  if (!sheet) return [];

  const rows: Array<{
    text: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
    points: number;
  }> = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const text = String(row.getCell(1).value ?? "").trim();
    const optionA = String(row.getCell(2).value ?? "").trim();
    const optionB = String(row.getCell(3).value ?? "").trim();
    const optionC = String(row.getCell(4).value ?? "").trim();
    const optionD = String(row.getCell(5).value ?? "").trim();
    const correctOption = String(row.getCell(6).value ?? "").trim().toUpperCase();
    const points = Number(row.getCell(7).value ?? 1);
    if (!text || !optionA || !optionB || !optionC || !optionD || !["A", "B", "C", "D"].includes(correctOption)) {
      return;
    }
    rows.push({ text, optionA, optionB, optionC, optionD, correctOption, points: Number.isFinite(points) ? points : 1 });
  });

  return rows;
}

export async function createStudentTemplate() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Students");
  sheet.addRow(["Matric No", "Surname", "First Name"]);
  sheet.addRow(["CSC/2026/001", "Doe", "John"]);
  sheet.getRow(1).font = { bold: true };
  sheet.columns = [{ width: 20 }, { width: 25 }, { width: 25 }];
  return await workbook.xlsx.writeBuffer();
}

export async function createQuestionTemplate() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Questions");
  sheet.addRow(["Question Text", "Option A", "Option B", "Option C", "Option D", "Correct Option (A/B/C/D)", "Points"]);
  sheet.addRow(["What is the capital of France?", "London", "Berlin", "Paris", "Madrid", "C", 1]);
  sheet.getRow(1).font = { bold: true };
  sheet.columns = [
    { width: 40 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 30 }, { width: 10 }
  ];
  return await workbook.xlsx.writeBuffer();
}
