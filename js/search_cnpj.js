document.getElementById('searchButton').addEventListener('click', function() {
  let cnpj = document.getElementById('cnpjInput').value;
  cnpj = cnpj.replace(/[.\-\/]/g, "");
  searchCnpj(cnpj);
});

function searchCnpj(cnpj) {
  fetch(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`)
    .then(response => response.json())
    .then(data => {
      displayCompanyInfo(data);
    })
    .catch(() => {
      displayNotFound();
    });
}

function displayCompanyInfo(data) {
  const container = document.getElementById('searchResults');
  container.innerHTML = ''; // Limpa resultados anteriores

  if (data && data['RAZAO SOCIAL']) {
    const infoHtml = `
      <section class="company-info" aria-labelledby="companyName" role="complementary">
        <h2 id="companyName">${data['RAZAO SOCIAL']} - ${data['NOME FANTASIA']}</h2>
        <dl class="company-details">
          <dt>Razão Social:</dt>
          <dd>${data['RAZAO SOCIAL']}</dd>
          <dt>Nome Fantasia:</dt>
          <dd>${data['NOME FANTASIA']}</dd>
          <dt>CNPJ:</dt>
          <dd>${data['CNPJ']}</dd>
          <dt>Status:</dt>
          <dd>${data['STATUS']}</dd>
          <!-- Outros campos da API -->
        </dl>
      </section>
    `;
    container.innerHTML = infoHtml;
  } else {
    displayNotFound();
  }
}

function displayNotFound() {
  document.getElementById('searchResults').innerHTML = '<div>CNPJ não encontrado</div>';
}
