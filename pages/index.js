import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../services/api";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import TrashIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    api.getAllProducts().then((r) => {
      setProducts(r);
    });
  }, []);

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" color="grey" sx={{ p: 4, boxShadow: 1 }}>
        <Toolbar>
          <Image
            src="https://i.ibb.co/LRtzDLL/LOGOTIPO-MIME-1.png"
            width={64}
            height={64}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "#75727F",
              pl: 2,
            }}
          >
            <strong>Lojinha Mime</strong>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#75727F" }}>Página Inicial</Button>
            <Button sx={{ color: "#75727F" }}>Vendas</Button>
            <Button
              sx={{
                color: "#75727F",
                textDecoration: "underline",
                textDecorationColor: "#428CCB",
                textUnderlineOffset: "4px",
              }}
            >
              Produtos
            </Button>
            <Button sx={{ color: "#75727F" }}>Clientes</Button>
            <Button sx={{ color: "#75727F" }}>Marketing</Button>
            <Button sx={{ color: "#75727F" }} onClick={() => logout()}>
              Sair
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ pt: 18, pl: 4, pr: 4, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
                  <h1 style={{ color: "#75727F", display: "inline-block" }}>
                    Produtos
                  </h1>{" "}
                  <span style={{ color: "#75727F", marginLeft: "16px" }}>
                    {products.length} cadastrados
                  </span>
                </TableCell>
                <TableCell align="right">
                  <button
                    style={{
                      backgroundColor: "#428CCB",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "6px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    + Adicionar Produto
                  </button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell align="center">Categoria</TableCell>
                <TableCell align="center">Avaliação</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.title}>
                  <TableCell style={{ width: "60%" }}>
                    <Image src={product.image} width={48} height={48} />
                    <span style={{ marginLeft: 24 }}>{product.title}</span>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.category}
                  </TableCell>
                  <TableCell align="left">
                    {[...Array(Math.floor(product.rating.rate))].map((r, i) => {
                      return <StarIcon color="disabled" key={i} />;
                    })}
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon color="disabled" /> <TrashIcon color="disabled" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
