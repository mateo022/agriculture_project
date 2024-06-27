# Backend API para Gestión Agrícola

Este proyecto de backend está diseñado para proporcionar servicios RESTful utilizando .NET Core Web API. La aplicación gestiona datos relacionados con fincas, lotes y grupos en el contexto de la agricultura, asegurando la integridad de las relaciones entre entidades y facilitando operaciones CRUD a través de una arquitectura en capas.

## Funcionalidad

El objetivo principal de este proyecto es ofrecer un conjunto de API que permita a los usuarios realizar las siguientes operaciones:

- **Fincas (Farms):**
  - Crear, leer, actualizar y eliminar información sobre fincas.
  - Asociar lotes específicos a cada finca.
  - Consultar detalles de fincas incluyendo información como ubicación, tamaño en hectáreas y descripción.

- **Lotes (Lots):**
  - Gestionar lotes de tierras asociados a cada finca.
  - Registrar número de árboles y etapa de desarrollo de cada lote.
  - Permite la creación, actualización y eliminación de lotes.

- **Grupos (Groups):**
  - Organizar lotes en grupos específicos.
  - Asignar grupos a lotes particulares.
  - Realizar operaciones CRUD en grupos, especificando el nombre y el lote al que pertenecen.

## Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas que separa claramente las responsabilidades funcionales:

- **Capa de Presentación (API):** Implementada como una API RESTful utilizando .NET Core Web API.
- **Capa de Aplicación:** Gestiona las solicitudes HTTP, las transformaciones de datos utilizando DTOs (Data Transfer Objects) y la validación inicial de solicitudes.
- **Capa de Negocio (Business):** Contiene la lógica de negocio que coordina las operaciones entre la capa de aplicación y la capa de acceso a datos.
- **Capa de Acceso a Datos (Data Access):** Utiliza Entity Framework Core para interactuar con la base de datos SQL Server.
- **Capa de Dominio (Domain):** Define los modelos de dominio y las relaciones entre entidades.
- **Capa de Servicios (Services):** Implementa servicios reutilizables y lógica específica que no pertenece a ninguna capa específica.

## Requisitos del Sistema

Para ejecutar correctamente este proyecto, se requiere:

- **Visual Studio 2022** o superior.
- **.NET Core**.
- **SQL Server Management Studio** para la gestión y mantenimiento de la base de datos Agrícola.
