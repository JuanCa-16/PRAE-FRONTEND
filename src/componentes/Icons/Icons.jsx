import * as React from 'react';

/**
 * @namespace Icons
 */

/**
 * @function
 * @memberof Icons
 * @description Icono de inicio.
 * Este es el icono que se utiliza para la pantalla de inicio.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const HomeIcon = ({
	color = '#000',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => {
	return (
		<svg
			className='iconosSvg'
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			fill='none'
			{...props}
		>
			<path
				className={estado || activo ? 'colorear' : 'normal'}
				fill={estado || activo ? color : colorApagado} // Corrige la sintaxis del operador ternario
				fillRule='evenodd'
				d='M13.9 7.038a1.855 1.855 0 0 1 2.227 0l6.492 4.869a1.854 1.854 0 0 1 .742 1.484v8.81a1.855 1.855 0 0 1-1.855 1.856h-4.544a1.02 1.02 0 0 1-1.02-1.02v-5.473a.928.928 0 0 0-1.856 0v5.473a1.02 1.02 0 0 1-1.02 1.02H8.522a1.855 1.855 0 0 1-1.855-1.855V13.39a1.854 1.854 0 0 1 .742-1.484l6.492-4.87Zm1.114 1.484L8.522 13.39v8.81h3.71v-4.637a2.782 2.782 0 1 1 5.564 0v4.638h3.71V13.39l-6.492-4.87Z'
				clipRule='evenodd'
			/>
		</svg>
	);
};

/**
 * @function
 * @memberof Icons
 * @description Icono de estudio.
 * Este es el icono que representa el estudio o aprendizaje.
 * @returns {JSX.Element} El icono SVG personalizado.
 */

const StudyIcon = ({
	color = '#000',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		className='iconosSvg'
		xmlns='http://www.w3.org/2000/svg'
		width={width}
		height={height}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M9.75 23a1.71 1.71 0 0 1-1.236-.499A1.617 1.617 0 0 1 8 21.3V7.7c0-.468.171-.868.514-1.2.344-.333.755-.5 1.236-.5h10.5c.481 0 .893.167 1.236.5.343.333.515.733.514 1.2v13.6c0 .467-.171.868-.514 1.201-.342.333-.754.5-1.236.499H9.75Zm0-1.7h10.5V7.7H18.5v5.95l-2.188-1.275-2.187 1.275V7.7H9.75v13.6Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de ajustes.
 * Este es el icono utilizado para la configuración o ajustes de la aplicación.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const AjustesIcon = ({
	color = '#000',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={30}
		height={30}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M14.013 24c-.379 0-.704-.128-.977-.383a1.573 1.573 0 0 1-.494-.934l-.19-1.403a3.152 3.152 0 0 1-.513-.255c-.161-.1-.319-.205-.473-.319l-1.303.553c-.35.156-.7.17-1.05.042a1.553 1.553 0 0 1-.82-.68l-.987-1.742a1.362 1.362 0 0 1-.168-1.042c.084-.368.273-.672.567-.913l1.113-.85a2.055 2.055 0 0 1-.02-.288v-.573c0-.092.006-.188.02-.287l-1.113-.85a1.615 1.615 0 0 1-.567-.914 1.362 1.362 0 0 1 .168-1.04l.987-1.743c.196-.326.47-.553.82-.68.35-.128.7-.114 1.05.042l1.303.553a5.73 5.73 0 0 1 .483-.319c.168-.1.336-.184.504-.255l.189-1.402c.056-.369.22-.68.494-.935S13.635 7 14.013 7h1.974c.379 0 .704.128.978.383.273.255.438.566.493.935l.19 1.402c.181.07.353.156.514.255.162.1.319.205.473.319l1.302-.553c.35-.156.7-.17 1.05-.042.35.127.624.354.82.68l.987 1.742c.196.326.252.673.168 1.041a1.615 1.615 0 0 1-.567.914l-1.113.85c.014.1.02.195.02.288v.572c0 .093-.014.189-.041.288l1.113.85c.294.24.483.545.567.913.084.369.028.716-.168 1.042l-1.008 1.742c-.196.326-.47.553-.82.68-.35.128-.7.114-1.05-.042l-1.26-.553c-.155.114-.316.22-.484.319a4.21 4.21 0 0 1-.504.255l-.189 1.402c-.056.369-.22.68-.493.936a1.382 1.382 0 0 1-.978.382h-1.974Zm.147-1.7h1.66l.293-2.253c.435-.113.837-.28 1.209-.498.371-.22.71-.485 1.018-.798l2.08.871.82-1.445-1.807-1.38c.07-.2.119-.408.147-.627a5.284 5.284 0 0 0 0-1.339 3.061 3.061 0 0 0-.147-.627l1.806-1.382-.819-1.444-2.08.892a4.67 4.67 0 0 0-1.018-.818 4.7 4.7 0 0 0-1.209-.5L15.84 8.7h-1.66l-.293 2.253c-.435.113-.837.28-1.208.5-.37.22-.71.485-1.02.796l-2.08-.872-.819 1.445 1.807 1.36c-.07.213-.119.425-.147.638a5.212 5.212 0 0 0 0 1.339c.028.212.077.425.147.637l-1.806 1.381.819 1.445 2.08-.892c.308.326.648.599 1.019.819.371.22.774.386 1.208.498l.273 2.253Zm.882-3.825c.812 0 1.506-.29 2.08-.871.574-.581.861-1.282.861-2.104 0-.822-.287-1.523-.861-2.104a2.818 2.818 0 0 0-2.08-.871c-.826 0-1.523.29-2.09.871a2.906 2.906 0 0 0-.851 2.104c0 .822.283 1.523.851 2.104.568.58 1.265.871 2.09.871Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de listado.
 * Este es el icono que representa un listado o menú.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const ListadoIcon = ({
	color = '#000',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={30}
		height={30}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M11.444 12.8a.88.88 0 0 1-.889-.9c0-.254.085-.468.257-.64a.856.856 0 0 1 .632-.26h10.667c.252 0 .463.086.634.26.17.172.256.386.255.64a.884.884 0 0 1-.256.642.845.845 0 0 1-.633.258H11.444Zm0 3.6a.88.88 0 0 1-.889-.9c0-.254.085-.468.257-.64a.856.856 0 0 1 .632-.26h10.667c.252 0 .463.086.634.26.17.172.256.386.255.64a.884.884 0 0 1-.256.642.845.845 0 0 1-.633.258H11.444Zm0 3.6a.88.88 0 0 1-.889-.9c0-.254.085-.468.257-.64a.856.856 0 0 1 .632-.26h10.667c.252 0 .463.086.634.26.17.172.256.386.255.64a.884.884 0 0 1-.256.642.845.845 0 0 1-.633.258H11.444ZM7.89 12.8A.88.88 0 0 1 7 11.9c0-.254.085-.468.256-.64a.856.856 0 0 1 .633-.26.86.86 0 0 1 .634.26.864.864 0 0 1 .255.64.894.894 0 0 1-.256.642.841.841 0 0 1-.633.258Zm0 3.6A.88.88 0 0 1 7 15.5c0-.254.085-.468.256-.64a.856.856 0 0 1 .633-.26.86.86 0 0 1 .634.26.864.864 0 0 1 .255.64.894.894 0 0 1-.256.642.841.841 0 0 1-.633.258Zm0 3.6A.88.88 0 0 1 7 19.1c0-.254.085-.468.256-.64a.856.856 0 0 1 .633-.26.86.86 0 0 1 .634.26.864.864 0 0 1 .255.64.894.894 0 0 1-.256.642.841.841 0 0 1-.633.258Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de estudiante.
 * Este es el icono que representa a un estudiante.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const EstudianteIcon = ({
	color = '#000',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={30}
		height={30}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			stroke={estado || activo ? color : colorApagado}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M20.25 22c.199 0 .39-.078.53-.218.141-.139.22-.328.22-.525v-.926c.003-2.084-2.98-3.717-6-3.717s-6 1.633-6 3.717v.926a.74.74 0 0 0 .22.525c.14.14.331.218.53.218h10.5Zm-2.547-10.323a2.654 2.654 0 0 1-.792 1.893 2.705 2.705 0 0 1-1.911.784 2.724 2.724 0 0 1-1.911-.784 2.675 2.675 0 0 1-.792-1.893c0-.71.285-1.39.792-1.893A2.716 2.716 0 0 1 15 9c.717 0 1.404.282 1.911.784.507.502.792 1.183.792 1.893Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de Profesor.
 * Este es el icono que representa a un Profesor.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const TeacherIcon = ({
	color = '#000',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={16}
		height={18}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			stroke={estado || activo ? color : colorApagado}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M1 1h10.889c1.467 0 2.2 0 2.655.469C15 1.938 15 2.69 15 4.2V9c0 1.509 0 2.262-.456 2.731-.456.469-1.188.469-2.655.469H6.444m.778-7.6h4.667M1 13V9.8c0-.754 0-1.131.228-1.366.228-.234.594-.234 1.328-.234H4.11M1 13h3.111M1 13v4m3.111-8.8V13m0-4.8h4.667M4.11 13v4'
		/>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			stroke={estado || activo ? color : colorApagado}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M4.111 4.6c0 .424-.164.831-.455 1.131-.292.3-.688.469-1.1.469-.413 0-.809-.169-1.1-.469A1.623 1.623 0 0 1 1 4.6c0-.424.164-.831.456-1.131.291-.3.687-.469 1.1-.469.412 0 .808.169 1.1.469.291.3.455.707.455 1.131Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de grados.
 * Este es el icono que representa los grados o niveles educativos.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const GradosIcon = ({
	color = '#000',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={30}
		height={30}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			fillRule='evenodd'
			d='M14.222 9.556A1.556 1.556 0 0 0 12.667 8H9.556A1.556 1.556 0 0 0 8 9.556v3.11a1.556 1.556 0 0 0 1.556 1.556h3.11a1.556 1.556 0 0 0 1.556-1.555V9.556Zm-4.666 0h3.11v3.11h-3.11v-3.11Zm12.444 0A1.556 1.556 0 0 0 20.444 8h-3.11a1.556 1.556 0 0 0-1.556 1.556v3.11a1.556 1.556 0 0 0 1.555 1.556h3.111A1.556 1.556 0 0 0 22 12.667V9.556Zm-4.667 0h3.111v3.11h-3.11v-3.11Zm-4.666 6.222a1.556 1.556 0 0 1 1.555 1.555v3.111A1.556 1.556 0 0 1 12.667 22H9.556A1.556 1.556 0 0 1 8 20.444v-3.11a1.556 1.556 0 0 1 1.556-1.556h3.11Zm0 1.555H9.556v3.111h3.11v-3.11Zm3.11 1.556a.778.778 0 0 1 .779-.778h1.555v-1.555a.778.778 0 0 1 1.556 0v1.555h1.555a.778.778 0 0 1 0 1.556h-1.555v1.555a.778.778 0 0 1-1.556 0v-1.555h-1.555a.778.778 0 0 1-.778-.778Z'
			clipRule='evenodd'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de salir.
 * Este es el icono utilizado para cerrar sesión o salir de la aplicación.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const ExitIcon = ({
	color = '#000',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={14}
		height={15}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M9.5 12.614V8.182H4.97a.445.445 0 0 1-.354-.2.824.824 0 0 1-.146-.482c0-.18.052-.354.146-.482a.445.445 0 0 1 .354-.2H9.5V2.386c0-.632-.185-1.239-.513-1.686C8.659.252 8.214 0 7.75 0h-6C1.286 0 .841.252.513.7.185 1.147 0 1.754 0 2.386v10.228c0 .632.185 1.239.513 1.686.328.448.773.7 1.237.7h6c.464 0 .909-.252 1.237-.7.328-.447.513-1.054.513-1.686Zm2.793-4.432-1.646 2.245c-.09.129-.14.3-.138.479a.821.821 0 0 0 .147.473.447.447 0 0 0 .347.2.438.438 0 0 0 .35-.188l2.5-3.409A.824.824 0 0 0 14 7.5a.824.824 0 0 0-.146-.482l-2.5-3.409a.438.438 0 0 0-.351-.188.447.447 0 0 0-.347.2.821.821 0 0 0-.147.474.832.832 0 0 0 .138.478l1.646 2.245H9.5v1.364h2.793Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de tema.
 * Este es el icono utilizado para cambiar o configurar el tema (oscuro/claro).
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const ThemeIcon = ({
	color = '#157AFE',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		className='iconosSvg'
		xmlns='http://www.w3.org/2000/svg'
		width={17}
		height={17}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M8.5 17A8.5 8.5 0 0 0 17 8.5 8.5 8.5 0 1 0 8.5 17Zm0-1.7V1.7a6.8 6.8 0 1 1 0 13.6Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de institución.
 * Este es el icono utilizado para representar una institución o entidad educativa.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const InstitucionIcon = ({
	color = '#157AFE',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={18}
		height={18}
		viewBox='0 0 15 15'
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M10.875 6.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm-2.25-3a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm-3.75 0a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm-2.25 3a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM6.75 0a6.75 6.75 0 0 0 0 13.5 1.125 1.125 0 0 0 1.125-1.125c0-.293-.112-.555-.293-.75a1.125 1.125 0 0 1 .84-1.875H9.75A3.75 3.75 0 0 0 13.5 6c0-3.315-3.023-6-6.75-6Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de datos.
 * Este es el icono utilizado para representar datos o estadísticas.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const DataIcon = ({
	color = '#157AFE',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={15}
		height={14}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M10.5 2.25a2.25 2.25 0 1 1 1.893 2.221L10.864 6.99a2.25 2.25 0 0 1-3.561 2.737L4.497 11.13l.003.12a2.25 2.25 0 1 1-.349-1.204L6.8 8.722a2.25 2.25 0 0 1 3.206-2.485l1.348-2.222A2.249 2.249 0 0 1 10.5 2.25Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de Facebook.
 * Este es el icono de la red social Facebook, utilizado para vincular a la página oficial.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const FacebookIcon = ({
	color = '#157AFE',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={20}
		height={20}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M18.9 0H1.1A1.1 1.1 0 0 0 0 1.1v17.8A1.1 1.1 0 0 0 1.1 20h9.58v-7.75h-2.6v-3h2.6V7a3.64 3.64 0 0 1 3.88-4 20 20 0 0 1 2.33.12v2.7H15.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H13.8V20h5.1a1.102 1.102 0 0 0 1.1-1.1V1.1A1.101 1.101 0 0 0 18.9 0Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de Instagram.
 * Este es el icono de la red social Instagram, utilizado para vincular a la página oficial.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const InstagramIcon = ({
	color = '#157AFE',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={20}
		height={20}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M11.029 0c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03 1.064.05 1.79.218 2.427.465.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.012.266.022.487.03.712l.006.194c.015.492.02 1.063.023 2.188v2.056a79.4 79.4 0 0 1-.022 2.188l-.006.194c-.008.225-.018.446-.03.712-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03-.194.006c-.493.014-1.064.021-2.19.023l-.745.001h-1.31c-.73.003-1.459-.005-2.188-.023l-.194-.006c-.238-.009-.475-.02-.712-.031-1.064-.05-1.79-.218-2.428-.465a4.899 4.899 0 0 1-1.771-1.153A4.9 4.9 0 0 1 .526 16.55C.279 15.913.11 15.187.06 14.122l-.03-.712-.005-.194A79.001 79.001 0 0 1 0 11.028V8.972a79 79 0 0 1 .022-2.188L.03 6.59c.008-.225.018-.446.03-.712.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 1.68 1.678 4.9 4.9 0 0 1 3.45.525C4.089.278 4.814.11 5.879.06c.266-.012.488-.022.712-.03l.194-.006A79 79 0 0 1 8.973.001L11.029 0ZM10 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2A3 3 0 1 1 10 13a3 3 0 0 1 .002-6m5.25-3.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de menú.
 * Este es el icono utilizado para abrir o cerrar el menú de navegación.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const MenuIcon = ({
	color = '#157AFE',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		className='iconosSvg'
		xmlns='http://www.w3.org/2000/svg'
		width={20}
		height={12}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='M.833 12h13.334c.458 0 .833-.45.833-1s-.375-1-.833-1H.833C.375 10 0 10.45 0 11s.375 1 .833 1Zm0-5h13.334c.458 0 .833-.45.833-1s-.375-1-.833-1H.833C.375 5 0 5.45 0 6s.375 1 .833 1ZM0 1c0 .55.375 1 .833 1h13.334c.458 0 .833-.45.833-1s-.375-1-.833-1H.833C.375 0 0 .45 0 1Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de ojo.
 * Este es el icono utilizado para representar la visibilidad de elementos o contenido en password.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const EyeIcon = ({
	color = '#157AFE',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={20}
		height={12}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'ojo'}
			stroke={estado || activo ? color : colorApagado}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M1 7c3.6-8 14.4-8 18 0'
		/>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			stroke={estado || activo ? color : colorApagado}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			d='M10 11a3 3 0 1 1 0-5.999A3 3 0 0 1 10 11Z'
		/>
	</svg>
);

/**
 * @function
 * @memberof Icons
 * @description Icono de ojo bloqueado.
 * Este es el icono utilizado para representar la invisibilidad o el bloqueo de contenido en password.
 * @returns {JSX.Element} El icono SVG personalizado.
 */
const EyeIconBlock = ({
	color = '#157AFE',
	colorApagado = '#000',
	width = 30,
	height = 30,
	estado,
	activo,
	dark,
	...props
}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={18}
		height={18}
		fill='none'
		{...props}
	>
		<path
			className={estado || activo ? 'colorear' : 'normal'}
			fill={estado || activo ? color : colorApagado}
			d='m11.726 12.634 5.175 5.177a.643.643 0 1 0 .91-.91L1.1.19a.644.644 0 1 0-.91.91L4.34 5.25c-.565.4-1.074.876-1.512 1.412A8.614 8.614 0 0 0 1.393 9.21c-.027.078-.06.186-.06.186l-.023.08s-.098.639.456.785a.643.643 0 0 0 .785-.456l.002-.004.01-.032.045-.14a7.328 7.328 0 0 1 1.215-2.152c.413-.505.9-.945 1.445-1.304l2.029 2.029a3.214 3.214 0 1 0 4.43 4.43M6.84 4.113 7.94 5.21A8.01 8.01 0 0 1 9 5.143c2.628 0 4.225 1.173 5.178 2.336a7.327 7.327 0 0 1 1.215 2.152c.022.063.037.11.045.14l.01.032v.004l.002.002a.643.643 0 0 0 1.242-.33v-.005l-.002-.005-.005-.016a2.594 2.594 0 0 0-.077-.24 8.614 8.614 0 0 0-1.436-2.549c-1.152-1.406-3.092-2.806-6.17-2.806a8.82 8.82 0 0 0-2.16.254Z'
		/>
	</svg>
);

// Exporta todos los iconos
export {
	HomeIcon,
	StudyIcon,
	AjustesIcon,
	ListadoIcon,
	EstudianteIcon,
	TeacherIcon,
	GradosIcon,
	ExitIcon,
	ThemeIcon,
	InstitucionIcon,
	FacebookIcon,
	InstagramIcon,
	MenuIcon,
	DataIcon,
	EyeIcon,
	EyeIconBlock,
};
