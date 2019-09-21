
let usuario=document.getElementById('usuario');
let comentario=document.getElementById('comentario');
let errorA=document.getElementById('errorA');
let errorB=document.getElementById('errorB');
let agregar=document.getElementById('agregar');

agregar.addEventListener('click',(evento)=>{
	if(usuario.value==""){
		errorA.innerHTML+='campo hobligatorio';
		errorA.style.color="red";
		errorA.style.fontFamily="sans-serif";
		evento.preventDefault();
	};
	if(comentario.value==""){
                errorB.innerHTML+='campo hobligatorio';
                errorB.style.color="red";
                errorB.style.fontFamily="sans-serif";
                evento.preventDefault();
        };
});
