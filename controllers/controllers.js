//importar tabla(modelo) pacientes
const represent = require('../models/representante.js');
const pacientes = require('../models/pacientes.js');
const consultas = require('../models/consulta.js');
const vacunas = require('../models/vacunas.js');
const { Op } = require('sequelize');
const session = 
//definir clave foranea entre el modelo pacientes y representante spider papu

// Un curso tiene muchos capítulos
represent.hasMany(pacientes,{
  foreignKey:'idRepresentante', // Clave foránea en la tabla `Capitulo`
  as:'pacientes',
});

// Un capítulo pertenece a un curso
pacientes.belongsTo(represent,{
  foreignKey:'idRepresentante',
  as:'representante',
});

pacientes.hasMany(consultas,{
	foreignKey:'idPacientes', // Clave foránea en la tabla `Capitulo`
	as:'consultas',
  });
consultas.belongsTo(pacientes,{
	foreignKey:'idPacientes',
	as:'pacientes',
  });

  vacunas.belongsTo(pacientes,{
	foreignKey:'idPacientes',
	as:'pacientes',
  });
  pacientes.belongsTo(vacunas,{
	foreignKey:'idPacientes',
	as:'vacunas',
  });

const index = async(req,res)=>{
	try{
		const data = await pacientes.count(); // Asegúrate de que 'Paciente' esté correctamente definido

            console.log(data)    // Redirigir a la vista /home con el conteo de pacientes
		res.render('index.ejs',{data});
	}catch(error){
		console.error(error.message);
		res.status(500).send('Error en el servidor');
	}
}

///////////////////////////////////////////////////
const login = async(req,res)=>{
	try{
		res.render('login.ejs');
	}catch(error){
		console.error(error.message);
		res.status(500).send('Error en el servidor');
	}

}
const loginPost = async(req,res)=>{
	try{
     const {usuario,password} = req.body;

	 const USUARIO= 'admin'
	 const PASSWORD='admin'
		 // Validar credenciales de ponysalvaje07
		 if (usuario === USUARIO && password === PASSWORD) {
			req.session.isActive = true;
			req.session.isActive = usuario;
			res.json({interruptor:true});

		 }else{
			res.json({interruptor:false});
		 }
	}catch(error){
		console.error(error.message);
		
	}
}
///////////////////////////////////////////////////
const register = async(req,res)=>{
	try{
		const representante = await represent.findAll();
		res.render('./nino/constancia_niño_sano',{representante});
	}catch(error){
		console.error(error.message);
		res.status(500).send('Error en el servidor');
	}

}
///////////////////////////////////////////////////
const registerPost = async(req,res)=>{
	try{
		let descripcion = " ";
		let idRepresentante;
		
     const {nombres,apellidos,edad,sexo,fecha_nac,lugar_nac,direccion,representante} = req.body;

      const idR = await represent.findOne({where:{cedula:representante}});

       if (idR) {
            idRepresentante = idR.id; // Solo accede a id si idR no es null
        } else {
           return res.json({discrepancia:true});
        }
      console.log(`id representante idR xxxxxxx=${idRepresentante}`);

      await pacientes.create({nombres,apellidos,edad,sexo,fechaNacimiento:fecha_nac,lugarNacimiento:lugar_nac,direccion,idRepresentante,descripcion});
	 
       res.json({interruptor:true});

	}catch(error){
		console.error(error.message);
		res.json({interruptor:false});
	}
}
///////////////////////////////////////////////////
const getPacientes = async(req,res)=>{
try{
const datos = await pacientes.findAll(); 
res.render('./nino/verNino',{pacientes:datos});
}catch(error){
 console.error(error.message);
 res.status(500).send('Error en el servidor');
}
}
///////////////////////////////////////////////////
const editarNino =  async(req,res)=>{
try{
 const id = req.params.id;
 const data = await pacientes.findOne({where:{id}});
 res.render('./nino/editarPaciente',{data});
}catch(error){
 console.error(error.message);
 res.status(500).send('Error en el servidor');
}
}
/////////////////////////////////////////////////
const verPerfil = async (req,res)=>{
try{
const id = req.params.id; 

const paciente = await pacientes.findOne({
	where: {
		[Op.or]: [
			{ id: { [Op.like]:`%${id}%`}},
			
		]
	},
	include: [
		{
			model: represent,
			as: 'representante' // Asegúrate de que este alias coincida con el que definiste en tu modelo
		},
		{
			model: consultas, // Asegúrate de que este es el modelo correcto para las consultas
			as: 'consultas', // Asegúrate de que este alias coincida con el que definiste en tu modelo
			where: {
				idPacientes: id // Filtra las consultas por el ID del paciente
			},
			required: false // Esto es opcional, pero si pones true, solo se traerán pacientes que tengan consultas
		}
	]
});
	console.log(`Paciente encontrado: ${JSON.stringify(paciente)}`);
	res.render('./perfil', { datos: paciente,tabla:'pacientes'});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Error en el servidor');
	}

}
////////////////////////////////////////////////
const representanteGet = async(req,res)=>{
try{
const r = await represent.findAll(); 
res.render('./representante/verRepre.ejs',{representante:r});
}catch(error){
 console.error(error.message);
 res.status(500).send('Error en el servidor');
}
}
///////////////////////////////////////////////////
const update = async(req,res)=>{
try{
const {nombres,apellidos,edad,sexo,fecha_nac,lugar_nac,direccion,descripcion,id} = req.body;

await pacientes.update({nombres,apellidos,edad,sexo,fechaNacimiento:fecha_nac,lugarNacimiento:lugar_nac,direccion,id,descripcion},{where:{id}});
res.json({interruptor:true});
}catch(error){
console.error(error.message);
res.json({interruptor:false});
}
}
///////////////////////////////////////////////////
const registerRepresentanteGet = async(req,res)=>{
try{
res.render('./representante/registroRepre');
}catch(error){
console.error(error.message);
res.status(500).send('Error en el servidor');
}
}
///////////////////////////////////////////////////
const registerRepresentantePost = async(req,res)=>{
try{
const {nombres,apellidos,edad,cedula,sexo,direccion,telefono,telefonoEmergencia} = req.body;
await represent.create({nombres,apellidos,edad,cedula,sexo,direccion,telefono,telefonoEmergencia});
res.json({interruptor:true});
}catch(error){
console.error(error.message);
res.json({interruptor:false});
}
}
///////////////////////////////////////////////////
const updateRepresentante = async(req,res)=>{
	try{ 
	const id = req.params.id;
	const r = await represent.findOne({where:{id}});
  res.render('./representante/editarRepre',{r});
	}catch(error){
  console.log(error.message);
  res.status(500).send('Error en el servidor');
	}
}
///////////////////////////////////////////////////
const updateRepresentantePost = async(req,res)=>{
	try{
	const id = req.params.id;
  const {nombres,apellidos,edad,cedula,sexo,direccion,telefono,telefonoEmergencia} = req.body;
  await represent.update({nombres,apellidos,edad,cedula,sexo,direccion,telefono,telefonoEmergencia},{where:{id}});
  res.json({interruptor:true});
	}catch(error){
   console.error(error.message);
   res.json({interruptor:false});
	}
}

///////////////////////////////////////////////////
const logout =(req,res)=>{
	try{
		req.session.destroy((err)=>{
			if(err){
				console.log("Error al cerrar session",err)
			}else{
				res.redirect('/')
			}
		})

	}catch{
		console.error(error.message);
		res.status(500).send("Error en el Servidor")
	}
}
///////////////////////////////////////////////////
const filtro = async (req, res) => {
    try {
        const { buscar } = req.body;

        // Primero, busca en la tabla representantes por cedula
        const representante = await represent.findOne({
            where: {
                cedula: { [Op.like]:`%${buscar}%` }
            },
            include: [
                {
                    model: pacientes,
                    as: 'pacientes' // Asegúrate de que este alias coincida con el que definiste en tu modelo
                }
            ]
        });

        if (representante) {
            // Si se encuentra un representante, devuelve el representante y sus pacientes
            console.log(`Representante encontrado: ${JSON.stringify(representante)}`);
            return res.render('./nino/verNinoFiltrado', { datos: representante,tabla:'representantes'});
        }

        // Si no se encuentra un representante, busca en la tabla pacientes
        const paciente = await pacientes.findOne({
            where: {
                [Op.or]: [
                    { nombres: { [Op.like]:`%${buscar}%`}},
                    { apellidos: { [Op.like]: `%${buscar}%`}},
                    
                ]
            },
            include: [
                {
                    model: represent,
                    as: 'representante' // Asegúrate de que este alias coincida con el que definiste en tu modelo
                }
            ]
        });

        if (!paciente) {
            return res.status(404).send('No se encontraron resultados');
        }

        console.log(`Paciente encontrado: ${JSON.stringify(paciente)}`);
        res.render('./nino/verNinoFiltrado', { datos: paciente,tabla:'pacientes'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};
///////////////////////////////////////////////////

const addconsulta = async (req,res)=>{
	try{ 
		const id = req.params.id;
		const data = {id}
	  res.render('./nino/consulta',{data});
		}catch(error){
	  console.log(error.message);
	  res.status(500).send('Error en el servidor');
		}
	};

const addconsultasPOST = async(req,res)=>{
		try{
		
		const {evaluacion,piel,peso,talla,temperatura,cardio,abdomen,laboratorio,snc,inmunizaciones,idx,idPacientes} = req.body;
			
		await consultas.create({evaluacion,piel,peso,talla,temperatura,cardio,abdomen,laboratorio,snc,inmunizaciones,idx,idPacientes});
		res.json({interruptor:true});
		}catch(error){
		console.error(error.message);
		res.json({interruptor:false});
		}
}

///////////////////////////////////////////////////
const editconsultaget = async (req,res)=>{

	try{ 
		const id = req.params.id;
		const data = await consultas.findOne({where:{id}});
	  res.render('./nino/consultaupdate',{data});
		}catch(error){
	  console.log(error.message);
	  res.status(500).send('Error en el servidor');
		}




}
const editconsultapos = async(req,res)=>{
	try{
		const {evaluacion,piel,peso,talla,temperatura,cardio,abdomen,laboratorio,snc,inmunizaciones,idx,id} = req.body;
	  await consultas.update({evaluacion,piel,peso,talla,temperatura,cardio,abdomen,laboratorio,snc,inmunizaciones,idx},{where:{id}});
	  res.json({interruptor:true});
		}catch(error){
	   console.error(error.message);
	   res.json({interruptor:false});
		}
}

const vacunasget = async (req,res)=>{
	try{ 
		const id = req.params.id;
		const data = {id}
	  res.render('./nino/vacunas',{data});
		}catch(error){
	  console.log(error.message);
	  res.status(500).send('Error en el servidor');
		}
	};


const vacunasPost = async(req,res)=>{

	try{
	
	const {tuberculosis1,tuberculosis2,tuberculosis3,tuberculosis4,tuberculosis5,
		polio1,polio2,polio3,polio4,polio5,
		triple1,triple2,triple3,triple4,triple5,
		hepatitisB1,hepatitisB2,hepatitisB3,hepatitisB4,hepatitisB5,
		rotavirus1,rotavirus2,rotavirus3,rotavirus4,rotavirus5,
		neumococo1,neumococo2,neumococo3,neumococo4,neumococo5,
		trivalente1,trivalente2,trivalente3,trivalente4,trivalente5,
		fiebreAmarilla1,fiebreAmarilla2,fiebreAmarilla3,fiebreAmarilla4,fiebreAmarilla5,
		hepatitisA1,hepatitisA2,hepatitisA3,hepatitisA4,hepatitisA5,
		antiInfluenza1,antiInfluenza2,antiInfluenza3,antiInfluenza4,antiInfluenza5,
		varicela1,varicela2,varicela3,varicela4,varicela5,
		toxoideTetánico1,toxoideTetánico2,toxoideTetánico3,toxoideTetánico4,toxoideTetánico5,
		pentavalente1,pentavalente2,pentavalente3,pentavalente4,pentavalente5,
		hexavalente1,hexavalente2,hexavalente3,hexavalente4,hexavalente5,
		otros1,otros2,otros3,otros4,otros5,idPacientes} = req.body;
		
	await vacunas.create({tuberculosis1,tuberculosis2,tuberculosis3,tuberculosis4,tuberculosis5,
		polio1,polio2,polio3,polio4,polio5,
		triple1,triple2,triple3,triple4,triple5,
		hepatitisB1,hepatitisB2,hepatitisB3,hepatitisB4,hepatitisB5,
		rotavirus1,rotavirus2,rotavirus3,rotavirus4,rotavirus5,
		neumococo1,neumococo2,neumococo3,neumococo4,neumococo5,
		trivalente1,trivalente2,trivalente3,trivalente4,trivalente5,
		fiebreAmarilla1,fiebreAmarilla2,fiebreAmarilla3,fiebreAmarilla4,fiebreAmarilla5,
		hepatitisA1,hepatitisA2,hepatitisA3,hepatitisA4,hepatitisA5,
		antiInfluenza1,antiInfluenza2,antiInfluenza3,antiInfluenza4,antiInfluenza5,
		varicela1,varicela2,varicela3,varicela4,varicela5,
		toxoideTetánico1,toxoideTetánico2,toxoideTetánico3,toxoideTetánico4,toxoideTetánico5,
		pentavalente1,pentavalente2,pentavalente3,pentavalente4,pentavalente5,
		hexavalente1,hexavalente2,hexavalente3,hexavalente4,hexavalente5,
		otros1,otros2,otros3,otros4,otros5,idPacientes});

	res.json({interruptor:true});
	}catch(error){
	console.error(error.message);
	res.json({interruptor:false});
	}
}

 const editvacunasget = async (req,res)=>{

	try{ 
		const id = req.params.id;
		
		const data = await vacunas.findOne({where:{
			[Op.or]: [
			{ idPacientes: { [Op.like]:`%${id}%`}},
			
			
		]
	}});
	   if(data){
		console.log(data)
	  res.render('./nino/vacunaedit',{data});
	   }else{
		res.render('./notFound');
	   }
		}catch(error){
	  console.log(error.message);
	  res.status(500).send('Error en el servidor');
		}
}

	const editvacunasPost = async (req,res)=>{
		try{
			const {tuberculosis1,tuberculosis2,tuberculosis3,tuberculosis4,tuberculosis5,
				polio1,polio2,polio3,polio4,polio5,
				triple1,triple2,triple3,triple4,triple5,
				hepatitisB1,hepatitisB2,hepatitisB3,hepatitisB4,hepatitisB5,
				rotavirus1,rotavirus2,rotavirus3,rotavirus4,rotavirus5,
				neumococo1,neumococo2,neumococo3,neumococo4,neumococo5,
				trivalente1,trivalente2,trivalente3,trivalente4,trivalente5,
				fiebreAmarilla1,fiebreAmarilla2,fiebreAmarilla3,fiebreAmarilla4,fiebreAmarilla5,
				hepatitisA1,hepatitisA2,hepatitisA3,hepatitisA4,hepatitisA5,
				antiInfluenza1,antiInfluenza2,antiInfluenza3,antiInfluenza4,antiInfluenza5,
				varicela1,varicela2,varicela3,varicela4,varicela5,
				toxoideTetánico1,toxoideTetánico2,toxoideTetánico3,toxoideTetánico4,toxoideTetánico5,
				pentavalente1,pentavalente2,pentavalente3,pentavalente4,pentavalente5,
				hexavalente1,hexavalente2,hexavalente3,hexavalente4,hexavalente5,
				otros1,otros2,otros3,otros4,otros5,idPacientes} = req.body;
				let id = idPacientes
		  await vacunas.update({tuberculosis1,tuberculosis2,tuberculosis3,tuberculosis4,tuberculosis5,
			polio1,polio2,polio3,polio4,polio5,
			triple1,triple2,triple3,triple4,triple5,
			hepatitisB1,hepatitisB2,hepatitisB3,hepatitisB4,hepatitisB5,
			rotavirus1,rotavirus2,rotavirus3,rotavirus4,rotavirus5,
			neumococo1,neumococo2,neumococo3,neumococo4,neumococo5,
			trivalente1,trivalente2,trivalente3,trivalente4,trivalente5,
			fiebreAmarilla1,fiebreAmarilla2,fiebreAmarilla3,fiebreAmarilla4,fiebreAmarilla5,
			hepatitisA1,hepatitisA2,hepatitisA3,hepatitisA4,hepatitisA5,
			antiInfluenza1,antiInfluenza2,antiInfluenza3,antiInfluenza4,antiInfluenza5,
			varicela1,varicela2,varicela3,varicela4,varicela5,
			toxoideTetánico1,toxoideTetánico2,toxoideTetánico3,toxoideTetánico4,toxoideTetánico5,
			pentavalente1,pentavalente2,pentavalente3,pentavalente4,pentavalente5,
			hexavalente1,hexavalente2,hexavalente3,hexavalente4,hexavalente5,
			otros1,otros2,otros3,otros4,otros5,idPacientes},{where:{id}});

		  res.json({interruptor:true});
			}catch(error){
		   console.error(error.message);
		   res.json({interruptor:false});
			}
	
	
	}

///////////////////////////////////////////////////
//exportar funciones al router.js
module.exports={
	index,
	login,
	register,
	registerPost,
	getPacientes,
	editarNino,
	representanteGet,
	verPerfil,
	update,
	registerRepresentanteGet,
	registerRepresentantePost,
	updateRepresentante,
	updateRepresentantePost,
	loginPost,
	logout,
	filtro,
	addconsulta,
	addconsultasPOST,
	editconsultaget,
	editconsultapos,
	vacunasget,
	vacunasPost,
	editvacunasPost,
	editvacunasget,
}