import { useRef } from "react";
import { HiPrinter } from "react-icons/hi2";
import { formatCurrency, formatDate } from "../lib/Date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function IvoicePdf({ item }) {
  const printRef = useRef(null);

  const calculateTotals = (products) => {
    const subtotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const tax = subtotal * 0; // Example: 0% tax
    const total = subtotal + tax;

    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals(item.products);

  const handlePdfDownload = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        const totalPages = Math.ceil(
          pdfHeight / pdf.internal.pageSize.getHeight()
        );

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage();
          pdf.addImage(
            imgData,
            "PNG",
            0,
            -i * pdf.internal.pageSize.getHeight(),
            pdfWidth,
            pdfHeight
          );
        }
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`invoice-${formatDate(new Date())}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="w-full bg-white p-8 flex flex-col items-center">
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full">
        <div
          ref={printRef}
          className="invoice-container w-full p-8 bg-white border border-gray-200"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">
                Invoice # {formatDate(item?.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold">Musdar Shope</h2>
              <p className="text-sm text-gray-600">
                123 alsulimanaya street
                <br />
                alriyadh, State 12345
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
            <p className="text-gray-700">
              {item.user.name}
              <br />
              olya street
              <br />
              alriyadh, State 12345
            </p>
          </div>

          <table className="w-full mb-8 border-collapse p-5">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-right">Qte</th>
                <th className="border p-2 text-right">Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through each product and render a row for it */}
              {item.products.map((product) => {
                const totalPrice = product.price * product.quantity;

                return (
                  <tr key={product._id}>
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2 text-right">
                      {product.quantity}
                    </td>
                    <td className="border p-2 text-right">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="border p-2 text-right">
                      {formatCurrency(totalPrice)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (0%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8">
            <p className="text-sm text-gray-600">
              Order will arrive in 2-3 days after payment confirmed
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Thank you for your ordering!
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePdfDownload}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
          >
            <HiPrinter size={20} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default IvoicePdf;
