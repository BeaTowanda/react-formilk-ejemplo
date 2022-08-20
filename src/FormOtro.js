import React, {useState} from "react"
import { Formik } from "formik";


const FormOtro= () =>{
    const [formularioEnviado,cambiarFormularioEnviado] = useState(false)
    return(
        <>
            <Formik
            initialValues={{
               // aquí pongo los valores son por defecto
               // y hay que agregar en input al value ={handleSubmit}
               // si dejo en blanco no viene con valores por default
                nombre : "Carlos",
                correo: "carlos@gmail.com"
            }

            }
            validate= {(valores) =>{
                let errores ={}
                if(!valores.nombre){
                    errores.nombre="por favor ingresa un nombre "
                    console.log("por favor ingresa nombre")
                } else if( !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
                    errores.nombre="el nombre solo puede contener letras y espacios"
                }
                // validación correo
                if(!valores.correo){
                    errores.correo="por favor ingresa un CORREO "
                    console.log("por favor ingresa correo")
                } else if( !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
                    errores.correo="Debe Ingresar un CORREO VALIDO"
                }
                return errores
            }}
            onSubmit={(valores,{resetForm}) => {
                // uso valores para los enviar los inputs y trabajarlos y el reset lo uso para que se limpie
                resetForm();
                console.log(valores.nombre)
                // aquí puedo conectarme con API y mandar los datos
                //console.log("form enviado")
                // valores puede llevar cualquier nombre
                cambiarFormularioEnviado(true);
                setTimeout(()=> cambiarFormularioEnviado(false),5000)
            }}>
        {/*estos es renderer prop-{() => ()} y se le puede inyectar valores de formik porque es una función 
        handleSubmit es una función de formik puedo poner en vez de handlesubm props y ver las props
        de las props desestructuro handleSubmit
        en values me permite acceder a los valores del formulario*/}
            {({values,handleSubmit,handleChange,handleBlur,errors,touched}) =>(  
            <form action="" onSubmit={handleSubmit} className="formulario">
				<div>
					<label htmlFor="nombre">Nombre</label>
					<input
						type="text"
						name="nombre"
						placeholder="Nombre"
						id="nombre"
						value={values.nombre}
                        //handeChange es de formik y hay que importarla
						onChange={handleChange}
                        // onBlur cuando la persona hace click fuera valida el campo 
                        onBlur={handleBlur}
                        // el touched me sirve para que solo salgo el tema del campo que fué tocado
					/>
                    
                    {touched.nombre &&errors.nombre && <div className="error">{errors.nombre}</div>}
				</div>

				<div>
					<label htmlFor="correo">Correo</label>
					<input
						type="text"
						name="correo"
						placeholder="Correo"
						id="correo"
						value={values.correo}
						onChange={handleChange}
                        onBlur={handleBlur}
					/>
                     {touched.correo &&  errors.correo && <div className="error">{errors.correo}</div>}
				</div>

				<button type="submit">Enviar</button>
                { formularioEnviado &&
                    <p className="exito">Formulario enviado con éxito</p> }
			</form> 
            ) }
            </Formik>
            
        </>
    )
}
export default FormOtro;