$(document).ready(function () {
	$(document).on("click", "#btn_openmodal", function (event) {
		Listar();
		$('.ui.longer.modal')
		.modal('show');
	});

	$(document).on("click", "#btn_add_form_contato", function (event) {
		const acao = sessionStorage.getItem("acao");
		if(acao === "E")
			 Editar();
    else
			Adicionar();
  });

	$(document).on("click", "#btn_edit_form_contato", function (event) {
		var item_selecionado = parseInt($(this).attr("alt"));
		sessionStorage.setItem("item_selecionado", item_selecionado)
		sessionStorage.setItem("acao", 'E');
		ClickEditar(item_selecionado);
	});

});

$(document).ready(function () {
	$(document).on("keyup", "#nome", function (event) {
		var texto = document.getElementById('nome').value
		var div = document.getElementById('m_nome');
		div.innerText = texto + "\n";
	});

	$(document).on("keyup", "#email", function (event) {
		var texto = document.getElementById('email').value
		var div = document.getElementById('m_email');
		div.innerText = texto + "\n";
	});

	$(document).on("keyup", "#telefone", function (event) {
		var texto = document.getElementById('telefone').value
		var div = document.getElementById('m_telefone');
		div.innerText = texto + "\n";
	});


	$(document).on("keyup", "#assunto", function (event) {
		var texto = document.getElementById('assunto').value
		var div = document.getElementById('m_assunto');
		div.innerText = texto + "\n";
	});

	$(document).on("keyup", "#mensagem", function (event) {
		var texto = document.getElementById('mensagem').value
		var div = document.getElementById('m_mensagem');
		div.innerText = texto + "\n";
	});

});



function MostrarValores(campo) {
	console.log('aqui')
	var texto = document.getElementById(campo).value
	var div = document.getElementById('m_' + campo);
	div.innerText = texto + "\n";
}

var operacao = "A"; //"A"=Adição; "E"=Edição
var item_selecionado = -1; //Índice do item selecionado na lista
var tbContato = sessionStorage.getItem("tbContato"); // Recupera os dados armazenados
tbContato = JSON.parse(tbContato); // Converte string para objeto
if (tbContato == null) // Caso não haja conteúdo, iniciamos um vetor vazio
	tbContato = [];

function Adicionar() {

	var cliente = JSON.stringify({
		Nome: $("#nome").val(),
		Telefone: $("#telefone").val(),
		Email: $("#email").val(),
		Assunto: $("#assunto").val(),
		Mensagem: $("#mensagem").val(),
	});
	tbContato.push(cliente);
	sessionStorage.setItem("tbContato", JSON.stringify(tbContato));
	Listar();
	document.getElementById('nome').value = '';
	document.getElementById('telefone').value = '';
	document.getElementById('email').value = '';
	document.getElementById('assunto').value = '';
	document.getElementById('mensagem').value = '';

	sessionStorage.setItem("acao", 'A');
	return true;
}

function Editar() {
	const item = sessionStorage.getItem("item_selecionado")
	tbContato[item] = JSON.stringify({
		Nome: $("#nome").val(),
		Telefone: $("#telefone").val(),
		Email: $("#email").val(),
		Assunto: $("#assunto").val(),
		Mensagem: $("#mensagem").val()
	});
	sessionStorage.setItem("tbContato", JSON.stringify(tbContato));

	document.getElementById('nome').value = '';
	document.getElementById('telefone').value = '';
	document.getElementById('email').value = '';
	document.getElementById('assunto').value = '';
	document.getElementById('mensagem').value = '';

	sessionStorage.setItem("acao", 'A');
	sessionStorage.removeItem("item_selecionado");
	return true;
}

function Listar() {
	$("#tbMostrarFormulario").html("");
	$("#tbMostrarFormulario").html(
		"<thead>" +
		"   <tr>" +
		"   <th>Nome</th>" +
		"   <th>Telefone</th>" +
		"   <th>Email</th>" +
		"   <th>Telefone</th>" +
		"   <th>Assunto</th>" +
		"   <th>Mensagem</th>" +
		"   <th></th>" +
		"   </tr>" +
		"</thead>" +
		"<tbody>" +
		"</tbody>"
	);
	for (var i in tbContato) {
		var frm = JSON.parse(tbContato[i]);
		$("#tbMostrarFormulario tbody").append("<tr>");
		$("#tbMostrarFormulario tbody").append("<td>" + frm.Nome + "</td>");
		$("#tbMostrarFormulario tbody").append("<td>" + frm.Telefone + "</td>");
		$("#tbMostrarFormulario tbody").append("<td>" + frm.Email + "</td>");
		$("#tbMostrarFormulario tbody").append("<td>" + frm.Telefone + "</td>");
		$("#tbMostrarFormulario tbody").append("<td>" + frm.Assunto + "</td>");
		$("#tbMostrarFormulario tbody").append("<td>" + frm.Mensagem + "</td>");
		$("#tbMostrarFormulario tbody").append("<td><img src='/assets/image/edit.png' id='btn_edit_form_contato' width='15px' heigth='15px' alt='" + i + "' /></td>");
		$("#tbMostrarFormulario tbody").append("</tr>");
	}
}

function ClickEditar(id) {

	sessionStorage.setItem("acao", 'E');
	
	var frm = JSON.parse(tbContato[id]);
	$("#txtCodigo").val(frm.Codigo);
	$("#nome").val(frm.Nome);
	$("#telefone").val(frm.Telefone);
	$("#email").val(frm.Email);
	$("#assunto").val(frm.Assunto);
	$("#mensagem").val(frm.Mensagem);
	$("#nome").focus();

	$('.ui.longer.modal')
		.modal('hide')
}
