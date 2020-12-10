function AbrirModal() {
	Listar();
	$('.ui.longer.modal')
		.modal('show');
}

function MostrarValores(campo) {

	var texto = document.getElementById(campo).value
	var div = document.getElementById('m_' + campo);
	console.log(texto)
	div.innerText = texto + "\n";
}

var operacao = "A"; //"A"=Adição; "E"=Edição
var indice_selecionado = -1; //Índice do item selecionado na lista
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

	return true;
}

function Editar() {
	tbContato[indice_selecionado] = JSON.stringify({
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

	operacao = "A";
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
		$("#tbMostrarFormulario tbody").append("<td><img src='/assets/image/edit.png' onClick='ClickEditar(" + i + ")' width='15px' heigth='15px' alt='" + i + "' /></td>");
		$("#tbMostrarFormulario tbody").append("</tr>");
	}
}

function ClickEditar(id) {
	operacao = "E";
	indice_selecionado = parseInt($(this).attr("alt"));
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
