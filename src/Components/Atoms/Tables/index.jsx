import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAllQuizzes } from "../../../Api/quizzes";


const Muitable = () => {
  const columns = [
    { id: "ID", name: "Id" },
    { id: "Judul", name: "Judul" },
    { id: "Deskripsi", name: "Deskripsi" },
    { id: "WaktuMulai", name: "Waktu Mulai" },
    { id: "WaktuSelesai", name: "Waktu Selesai" },
    { id: "Actions", name: "Actions" } // Tambah kolom baru untuk tombol "Edit Quiz"
  ];

  const handlechangepage = (event, newpage) => {
    setPage(newpage);
  };

  const handleRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await fetchAllQuizzes();
        console.log("Data quizzes:", data); // Tambahkan pesan log di sini
        setRows(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
    <h1 className="text-2xl font-bold text-primary">List Quiz</h1>

      <Paper sx={{ width: "100%", marginLeft: "0%" }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    style={{ backgroundColor: "#4a00ff", color: "white", fontWeight: 'bold' }}
                    key={column.id}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((rows, i) => (
                    <TableRow key={i}>
                      {columns.map((column) => (
                        <TableCell key={column.id} style={{ fontWeight: 'bold' }}>
  {column.id === "Actions" ? (
    <button className="btn bg-yellow-500 mb-4 mr-2">Edit Quiz</button>
  ) : (
    column.id === "WaktuMulai" || column.id === "WaktuSelesai" ? (
      new Date(rows[column.id]).toLocaleString()
    ) : (
      rows[column.id]
    )
  )}
</TableCell>

                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={rows.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Muitable;

