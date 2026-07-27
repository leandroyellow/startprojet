import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DataBaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAtDate = "Carregando ...";

  if (!isLoading && data) {
    UpdatedAtDate = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {UpdatedAtDate}</div>;
}

function DataBaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let dataBaseStatusInformation = "Carregando ...";

  if (!isLoading && data) {
    dataBaseStatusInformation = (
      <>
        <div>Versâo: {data.dependencies.database.version}</div>
        <div>Conexões máximas: {data.dependencies.database.max_connections}</div>
        <div>Conexões em aberto: {data.dependencies.database.opened_connections}</div>
      </>
    );
  }

  return (
    <>
      <h2>DataBase</h2>
      {dataBaseStatusInformation}
    </>
  );
}
