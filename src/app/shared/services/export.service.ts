import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
//import { PdfExportService } from '@codewithrajat/rm-ng-pdf-export'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  toExcel(data: any[], fileName: string = 'exported_data', sheetName: string = 'Sheet1'): void {
    // Convert data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const workbook: XLSX.WorkBook = {
      Sheets: { [sheetName]: worksheet },
      SheetNames: [sheetName]
    };

    // Export to Excel file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  async toExcelWithStyle(data: any[], fileName: string): Promise<void> {
    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees', {
      pageSetup: { paperSize: 9, orientation: 'landscape' }
    });

    // Define columns
    const headers = Object.keys(data[0]);
    worksheet.columns = headers.map(header => ({
      header: this.formatHeader(header),
      key: header,
      width: 20
    }));

    // Add data
    data.forEach(item => {
      worksheet.addRow(item);
    });

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = {
      bold: true,
      color: { argb: 'FFFFFFFF' },
      size: 12,
      name: 'Calibri'
    };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F81BD' }
    };
    headerRow.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    };
    headerRow.height = 25;

    // Style data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.alignment = { vertical: 'middle', horizontal: 'left' };
        row.height = 20;

        // Add borders
        row.eachCell(cell => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });

        // Alternate row colors
        if (rowNumber % 2 === 0) {
          row.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF2F2F2' }
          };
        }
      }
    });

    // Add conditional formatting for specific columns
    if (headers.includes('salary')) {
      const salaryColumn = worksheet.getColumn('salary');
      salaryColumn.eachCell({ includeEmpty: false }, (cell, rowNumber) => {
        if (rowNumber > 1 && typeof cell.value === 'number') {
          if (cell.value > 80000) {
            cell.font = { color: { argb: 'FF00CC00' }, bold: true };
          } else if (cell.value < 50000) {
            cell.font = { color: { argb: 'FFFF0000' } };
          }
        }
      });
    }

    // Freeze header row
    worksheet.views = [
      { state: 'frozen', xSplit: 0, ySplit: 1 }
    ];

    // Generate and save file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.xlsx`);
  }

  private formatHeader(header: string): string {
    // Convert camelCase to Title Case with spaces
    const result = header.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  public exportToPdf(elementId: string, fileName: string = 'table-export.pdf'): void {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    html2canvas(element, {
      scale: 2, // Better quality
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Configurable margins (in mm)
      const margins = {
        top: 15,    // Top margin
        bottom: 15, // Bottom margin
        left: 5,    // Left margin
        right: 5    // Right margin
      };

      const availableWidth = pdf.internal.pageSize.getWidth() - margins.left - margins.right;
      const availableHeight = pdf.internal.pageSize.getHeight() - margins.top - margins.bottom;

      const imgWidth = availableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let currentPosition = margins.top;

      // Add first page
      pdf.addImage(imgData, 'PNG', margins.left, currentPosition, imgWidth, imgHeight);
      heightLeft -= availableHeight;
      currentPosition = margins.top - imgHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margins.left, currentPosition, imgWidth, imgHeight);
        heightLeft -= availableHeight;
        currentPosition -= availableHeight;
      }

      pdf.save(fileName);
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  }

}
