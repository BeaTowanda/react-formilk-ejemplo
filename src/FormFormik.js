import React, {useState} from "react"
import { Formik, Form, Field, ErrorMessage } from "formik";

// aquí voy a usar form, fiel, errorMessage
//a) el form en F mayusucla usa el formik
// puede eliminar handleSubmit
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
                if(!valores.pais){
                    errores.pais="por favor selecciona PAIS "
                    console.log("por favor ingresa PAIS")
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
            {({handleSubmit,errors}) =>(  
            <Form action="" onSubmit={handleSubmit} className="formulario">
				<div>
					<label htmlFor="nombre">Nombre</label>
					<Field
						type="text"
						name="nombre"
						placeholder="Nombre"
						id="nombre"
					
					/>
                    <ErrorMessage name="nombre" component={()=>{
                        <div className="error">{errors.nombre}</div>
                        //aquí component actúa como una función que retorna jsx
                    }}
                    />
                    <div>
                        <Field name="pais"
                                as="select"
                        >
                            <option>Mexico</option>
                            <option>Hungría</option>
                            <option>Argentina</option>

                        </Field>
                    </div>
                    <div>
                        <label>
                        <Field type="radio"
                                value="hombre"
                                name="sexo"
                            />Hombre 
                        </label>
                        <label>
                        <Field type="radio"
                                value="mujer"
                                name="sexo"
                            />Mujer
                        </label>
                       
                    </div>
                    <div>
                        <Field as="textarea"
                                name="mensaje"
                                placeholder="mensaje"
                                >

                        </Field>
                    </div>
                    
                    
                    
				</div>

				<div>
					<label htmlFor="correo">Correo</label>
					<Field
						type="text"
						name="correo"
						placeholder="Correo"
						id="correo"
						
					/>
                    <ErrorMessage name="correo" component={()=>{
                        <div className="error">{errors.correo}</div>
                    }}
                    />
				</div>

				<button type="submit">Enviar</button>
                {formularioEnviado &&
                    <p className="exito">Formulario enviado con éxito</p> }
			</Form> 
            ) }
            </Formik>
            
        </>
    )
}
export default FormOtro;