const productTableBody = document.querySelector("#product-table tbody");
const productForm = document.getElementById("product-form");
const toggleRoleButton = document.getElementById("toggle-role");

// Inicialização do usuário (pode ser alterado para simular admin ou cliente)
const currentUser = {
    isAdmin: true // Altere para false para simular um cliente
};

// Lista de produtos (carrega do localStorage se disponível)
let products = JSON.parse(localStorage.getItem("products")) || [];

// Mostra ou esconde o formulário de adição de produto com base no tipo de usuário
function updateUserInterface() {
    if (currentUser.isAdmin) {
        productForm.style.display = "block"; // Exibe o formulário para admin
        toggleRoleButton.innerText = "Trocar para Cliente";
    } else {
        productForm.style.display = "none"; // Esconde o formulário para clientes
        toggleRoleButton.innerText = "Trocar para Admin";
    }
    updateProductTable();
}

// Função para atualizar a tabela de produtos
function updateProductTable() {
    productTableBody.innerHTML = ""; // Limpa a tabela antes de atualizar
    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>
                ${currentUser.isAdmin ? `<button class="remove-button" onclick="removeProduct(${index})">Remover</button>` : ''}
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

// Função para adicionar um produto
productForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Verifica se o usuário é admin antes de adicionar o produto
    if (!currentUser.isAdmin) {
        alert("Você não tem permissão para adicionar produtos.");
        return;
    }

    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const image = document.getElementById("product-image").value;

    // Adiciona o novo produto à lista
    products.push({ name, price, image });
    localStorage.setItem("products", JSON.stringify(products)); // Salva os produtos no localStorage

    // Limpa o formulário
    productForm.reset();

    // Atualiza a tabela
    updateProductTable();
});

// Função para remover um produto
function removeProduct(index) {
    // Verifica se o usuário é admin antes de remover o produto
    if (!currentUser.isAdmin) {
        alert("Você não tem permissão para remover produtos.");
        return;
    }

    products.splice(index, 1); // Remove o produto da lista
    localStorage.setItem("products", JSON.stringify(products)); // Atualiza o localStorage
    updateProductTable(); // Atualiza a tabela
}

// Alterna entre os modos de admin e cliente
toggleRoleButton.addEventListener("click", () => {
    currentUser.isAdmin = !currentUser.isAdmin; // Alterna o papel do usuário
    updateUserInterface(); // Atualiza a interface
});

// Inicializa a interface do usuário
updateUserInterface();
