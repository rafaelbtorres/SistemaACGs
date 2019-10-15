import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

var url;

// eslint-disable-next-line no-unused-vars
function deletar(id) {
  axios
    .delete(url, { id })
    .then(response => response.json())
    .then(success => {
      console.log(success);
    })
    .catch(err => console.log(err));
}

export default function Exibir() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Id", field: "id", type: "numeric" },
      { title: "Nome", field: "nome" },
      { title: "Matricula", field: "matricula" },
      { title: "Data", field: "data", type: "numeric" }
    ],
    data: [
      {
        id: 1,
        nome: "Rodrigo",
        matricula: "171150123",
        data: "20 / 11 / 2019"
      },
      {
        id: 2,
        nome: "Sandro",
        matricula: "171150870",
        data: "10 / 10 / 2019"
      }
    ]
  });

  React.useEffect(async () => {
    const requestSolicitacoes = axios.get(url);
    const [solicitacoes] = await Promise.all([requestSolicitacoes]);
    setState(state => ({ ...state, solicitacoes }));
  }, []);

  return (
    <MaterialTable
      title="Solicitações"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              deletar(oldData.id);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
}
