function teste(request, response) {
  response
    .status(200)
    .json({ chave: "Sou aluno acima da média! mais um tétéõs" });
}

export default teste;
