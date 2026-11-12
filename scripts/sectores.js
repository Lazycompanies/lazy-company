/*
 * sectores.js — contenido de las paginas por tipo de negocio (sectores/*.html). Lo usa gen-pages.js.
 * Reglas: nada de cifras, clientes ni resultados inventados; los precios salen de servicios.js.
 * Cada sector recomienda 3 servicios (keys de servicios.js) con una frase propia de ese negocio.
 * La linea de tiempo es un ejemplo ilustrativo y la pagina lo dice.
 */
const b = (es, en) => ({es, en});
const p = (t, d) => ({t, d});
const at = (when, what) => ({when, what});
const sv = (key, d) => ({key, d});

module.exports = [
  {
    key: 'clinicas',
    name: b('Clínicas', 'Clinics'),
    title: 'Automatización con IA para clínicas y centros de estética | Lazy Company',
    desc: 'Agentes de IA para WhatsApp, agendamiento automático y CRM para clínicas, consultorios y centros de estética en Colombia: citas que se agendan, confirman y recuerdan solas. Precios de referencia en COP.',
    ogdesc: 'Citas que se agendan, confirman y recuerdan solas, y pacientes que reciben respuesta a cualquier hora.',
    audience: 'Clínicas, consultorios y centros de estética',
    label: b('Para clínicas, consultorios y centros de estética', 'For clinics, practices and aesthetic centers'),
    h1: b('Tu clínica agenda, confirma y responde <em>mientras atiendes</em>', 'Your clinic books, confirms and replies <em>while you see patients</em>'),
    lead: b('Implementamos agentes de IA, agendamiento automático y CRM para clínicas en Colombia: tus pacientes reservan por WhatsApp a cualquier hora, reciben recordatorios y nadie se queda sin respuesta.',
            'We implement AI agents, automated scheduling and CRM for clinics in Colombia: your patients book on WhatsApp at any hour, get reminders, and nobody is left without a reply.'),
    painsTitle: b('Lo que vive una clínica <em>todos los días</em>', 'What a clinic deals with <em>every day</em>'),
    pains: [
      p(b('Mensajes que llegan en plena consulta', 'Messages that arrive mid-appointment'),
        b('Mientras atiendes a un paciente, otros escriben preguntando precios y horarios. Cuando por fin respondes, algunos ya reservaron en otro lugar.',
          'While you see one patient, others write asking about prices and times. By the time you reply, some have already booked elsewhere.')),
      p(b('Citas que no llegan', 'Appointments that never show'),
        b('Cada ausencia deja un hueco en la agenda que nadie alcanza a llenar. Confirmar una por una, por mensaje o llamada, se come horas de recepción.',
          'Every no-show leaves a gap nobody manages to fill. Confirming one by one, by message or call, eats hours of front-desk time.')),
      p(b('La agenda vive en varios lugares', 'The calendar lives in several places'),
        b('Un cuaderno, el WhatsApp del celular y una hoja de cálculo. Mover una cita implica revisar los tres y esperar no equivocarse.',
          'A notebook, the WhatsApp on someone’s phone and a spreadsheet. Moving an appointment means checking all three and hoping nothing slips.')),
      p(b('Pacientes que no vuelven', 'Patients who don’t come back'),
        b('Quien se hizo un tratamiento hace meses necesita un control o una sesión de mantenimiento, pero nadie le escribe a tiempo.',
          'Someone who had a treatment months ago needs a check-up or a maintenance session, but nobody reaches out in time.'))
    ],
    dayTitle: b('Una noche cualquiera, <em>con el sistema</em>', 'Any given night, <em>with the system</em>'),
    day: [
      at(b('Lunes · 9:47 p. m.', 'Monday · 9:47 p.m.'), b('Una paciente escribe por WhatsApp: quiere saber el precio de una valoración.', 'A patient writes on WhatsApp asking how much an assessment costs.')),
      at(b('9:47 p. m.', '9:47 p.m.'), b('El agente le responde con la información que tú aprobaste y le muestra los horarios libres.', 'The agent replies with the information you approved and shows her the open slots.')),
      at(b('9:49 p. m.', '9:49 p.m.'), b('Ella elige el jueves a las 10:00. La cita queda en tu agenda y su ficha en el CRM.', 'She picks Thursday at 10:00. The appointment lands in your calendar and her record in the CRM.')),
      at(b('Miércoles · 10:00 a. m.', 'Wednesday · 10:00 a.m.'), b('Le llega un recordatorio y confirma con un toque.', 'She gets a reminder and confirms with one tap.')),
      at(b('Jueves · 9:30 a. m.', 'Thursday · 9:30 a.m.'), b('Tu equipo ve en el tablero quién viene hoy y qué preguntó cada paciente.', 'Your team sees on the board who is coming today and what each patient asked.'))
    ],
    dayNote: b('Ejemplo ilustrativo. Si un paciente pregunta algo clínico, el agente no lo responde: se lo pasa a tu equipo.',
               'Illustrative example. If a patient asks something clinical, the agent doesn’t answer it: it hands it to your team.'),
    services: [
      sv('agendamiento', b('Reservas en línea las 24 horas, confirmaciones y recordatorios automáticos, y reprogramación sin llamadas.', 'Online booking around the clock, automatic confirmations and reminders, and rescheduling without phone calls.')),
      sv('agentes', b('Un agente de IA entrenado con tus servicios, precios y horarios responde por WhatsApp e Instagram y agenda la valoración.', 'An AI agent trained on your services, prices and hours replies on WhatsApp and Instagram and books the assessment.')),
      sv('crm', b('La ficha de cada paciente con sus conversaciones, citas y tratamientos, y avisos para controles y seguimientos.', 'Each patient’s record with their conversations, appointments and treatments, plus alerts for check-ups and follow-ups.'))
    ],
    costQ: b('¿Cuánto cuesta automatizar una clínica?', 'How much does it cost to automate a clinic?'),
    faq: [
      {q: b('¿El agente puede responder preguntas médicas?', 'Can the agent answer medical questions?'),
       a: b('No. El agente responde lo que tú definas, como servicios, precios, horarios y preparación para una cita, y agenda. Si un paciente pregunta algo clínico o que requiere criterio profesional, se lo pasa a tu equipo.',
            'No. The agent answers what you define, such as services, prices, hours and how to prepare for an appointment, and it books. If a patient asks something clinical or that needs professional judgment, it hands it to your team.')},
      {q: b('¿Qué pasa con los datos de mis pacientes?', 'What happens to my patients’ data?'),
       a: b('Los tratamos conforme a la Ley 1581 de 2012 de protección de datos personales y a nuestra Política de privacidad. Definimos contigo qué información puede usar el agente.',
            'We handle them under Colombia’s personal data protection law (Ley 1581 de 2012) and our Privacy Policy. We define with you which information the agent can use.')}
    ],
    waText: 'Hola, tengo una clínica y quiero automatizar la agenda y la atención',
    ctaTitle: b('¿Cuánto de tu clínica podría <em>funcionar sola</em>?', 'How much of your clinic could <em>run on its own</em>?')
  },

  {
    key: 'inmobiliarias',
    name: b('Inmobiliarias', 'Real estate'),
    title: 'Agentes de IA y CRM para inmobiliarias | Lazy Company',
    desc: 'Agentes de IA para WhatsApp, CRM y seguimiento automático para inmobiliarias en Colombia: respuesta inmediata a cada interesado, filtro por presupuesto y visitas agendadas. Precios de referencia en COP.',
    ogdesc: 'Cada interesado recibe respuesta al momento, se filtra por presupuesto y su visita queda agendada.',
    audience: 'Inmobiliarias y agentes inmobiliarios',
    label: b('Para inmobiliarias y agentes inmobiliarios', 'For real estate agencies and agents'),
    h1: b('Cada interesado recibe respuesta <em>y cada visita queda agendada</em>', 'Every lead gets an answer <em>and every viewing gets booked</em>'),
    lead: b('Implementamos agentes de IA, CRM y seguimiento automático para inmobiliarias en Colombia: el sistema responde a los interesados que llegan por WhatsApp, Instagram y tu web, filtra quién está listo para comprar o arrendar y agenda la visita.',
            'We implement AI agents, CRM and automatic follow-up for real estate agencies in Colombia: the system answers leads coming in through WhatsApp, Instagram and your website, filters who is ready to buy or rent, and books the viewing.'),
    painsTitle: b('Lo que vive una inmobiliaria <em>todos los días</em>', 'What a real estate agency deals with <em>every day</em>'),
    pains: [
      p(b('Muchos mensajes, pocos clientes reales', 'Lots of messages, few real buyers'),
        b('Llegan consultas por WhatsApp, Instagram y la web, y muchas son pura curiosidad. Filtrar a mano quién tiene presupuesto y urgencia toma el día entero.',
          'Inquiries arrive through WhatsApp, Instagram and the website, and many are just curiosity. Filtering by hand who has the budget and the urgency takes all day.')),
      p(b('Las mismas preguntas una y otra vez', 'The same questions over and over'),
        b('¿Sigue disponible? ¿Cuánto es la administración? ¿Aceptan mascotas? Responder lo mismo cien veces aleja al asesor de cerrar negocios.',
          'Is it still available? What are the HOA fees? Are pets allowed? Answering the same thing a hundred times keeps agents away from closing deals.')),
      p(b('Seguimientos que se olvidan', 'Follow-ups that get forgotten'),
        b('Un interesado que dijo «lo voy a pensar» necesita volver a saber de ti. Sin un sistema, se enfría y termina con otra inmobiliaria.',
          'A lead who said “I’ll think about it” needs to hear from you again. Without a system, they go cold and end up with another agency.')),
      p(b('Clientes regados entre asesores', 'Leads scattered across agents'),
        b('Cada asesor lleva sus clientes en su propio celular. Si alguien sale del equipo, se van con él los contactos y el historial.',
          'Each agent keeps their leads on their own phone. When someone leaves the team, the contacts and the history leave with them.'))
    ],
    dayTitle: b('Un domingo cualquiera, <em>con el sistema</em>', 'Any given Sunday, <em>with the system</em>'),
    day: [
      at(b('Domingo · 8:12 p. m.', 'Sunday · 8:12 p.m.'), b('Llega una consulta por Instagram sobre un apartamento en arriendo.', 'An Instagram inquiry arrives about an apartment for rent.')),
      at(b('8:12 p. m.', '8:12 p.m.'), b('El agente responde disponibilidad, valor y requisitos, y pregunta presupuesto, fecha de mudanza y cuántas personas vivirían.', 'The agent answers availability, price and requirements, and asks for budget, move-in date and how many people would live there.')),
      at(b('8:15 p. m.', '8:15 p.m.'), b('El interesado cumple los requisitos: el agente le ofrece horarios y agenda la visita del martes.', 'The lead meets the requirements: the agent offers times and books Tuesday’s viewing.')),
      at(b('8:15 p. m.', '8:15 p.m.'), b('El CRM crea su ficha con todo lo que respondió y la asigna a un asesor.', 'The CRM creates the lead’s record with everything they answered and assigns it to an agent.')),
      at(b('Lunes · 9:00 a. m.', 'Monday · 9:00 a.m.'), b('El asesor abre su tablero y encuentra la visita confirmada, con todo el contexto.', 'The agent opens their board and finds the confirmed viewing, with all the context.'))
    ],
    dayNote: b('Ejemplo ilustrativo. Si el interesado no responde, el sistema le vuelve a escribir días después para retomar.',
               'Illustrative example. If the lead goes quiet, the system writes again a few days later to pick things up.'),
    services: [
      sv('agentes', b('Responde al instante por WhatsApp, Instagram y web, filtra por presupuesto y requisitos, y agenda visitas.', 'Replies instantly on WhatsApp, Instagram and web, filters by budget and requirements, and books viewings.')),
      sv('crm', b('Cada interesado y cada propiedad en un solo tablero, con el historial de conversaciones y el asesor asignado.', 'Every lead and every property on one board, with the conversation history and the assigned agent.')),
      sv('conversion', b('Seguimiento automático a quien preguntó y no avanzó, en el momento justo, hasta cerrar o descartar.', 'Automatic follow-up with whoever asked and didn’t move forward, at the right time, until it closes or is ruled out.'))
    ],
    costQ: b('¿Cuánto cuesta automatizar una inmobiliaria?', 'How much does it cost to automate a real estate agency?'),
    faq: [
      {q: b('¿Sirve para venta y para arriendo?', 'Does it work for both sales and rentals?'),
       a: b('Sí. Configuramos preguntas de filtro distintas para cada caso, como presupuesto, fecha y requisitos, y el agente agenda la visita según el tipo de inmueble.',
            'Yes. We set up different screening questions for each case, such as budget, dates and requirements, and the agent books the viewing according to the type of property.')}
    ],
    waText: 'Hola, tengo una inmobiliaria y quiero automatizar la atención de interesados',
    ctaTitle: b('¿Cuánto de tu inmobiliaria podría <em>funcionar sola</em>?', 'How much of your agency could <em>run on its own</em>?')
  },

  {
    key: 'restaurantes',
    name: b('Restaurantes', 'Restaurants'),
    title: 'Reservas automáticas y agentes de IA para restaurantes | Lazy Company',
    desc: 'Reservas automáticas, agentes de IA para WhatsApp e Instagram y webs para restaurantes, cafés y bares en Colombia: reservas confirmadas y mensajes respondidos sin soltar el servicio. Precios de referencia en COP.',
    ogdesc: 'Reservas que se confirman solas y mensajes respondidos mientras tu equipo atiende el salón.',
    audience: 'Restaurantes, cafés y bares',
    label: b('Para restaurantes, cafés y bares', 'For restaurants, cafés and bars'),
    h1: b('Reservas y mensajes resueltos <em>mientras tu equipo atiende</em>', 'Bookings and messages handled <em>while your team serves</em>'),
    lead: b('Implementamos reservas automáticas, agentes de IA para WhatsApp e Instagram y webs para restaurantes en Colombia: tus clientes reservan, preguntan por la carta y confirman sin que nadie tenga que soltar la cocina o el salón.',
            'We implement automated bookings, AI agents for WhatsApp and Instagram, and websites for restaurants in Colombia: your guests book, ask about the menu and confirm without anyone leaving the kitchen or the floor.'),
    painsTitle: b('Lo que vive un restaurante <em>todos los días</em>', 'What a restaurant deals with <em>every day</em>'),
    pains: [
      p(b('El teléfono suena en la hora pico', 'The phone rings at peak hour'),
        b('Justo cuando el salón está lleno llegan las llamadas y los mensajes para reservar. Nadie puede contestar sin descuidar a quien ya está en la mesa.',
          'Right when the room is full, calls and messages to book start coming in. Nobody can answer without neglecting the guests already seated.')),
      p(b('Mesas reservadas que quedan vacías', 'Booked tables that stay empty'),
        b('Sin una confirmación, una reserva que no llega es una mesa perdida en el mejor horario de la noche.',
          'Without a confirmation, a booking that doesn’t show is a table lost at the best time of the night.')),
      p(b('Las mismas preguntas en Instagram', 'The same questions on Instagram'),
        b('¿Tienen opciones vegetarianas? ¿Hasta qué hora abren? ¿Hay parqueadero? Los mensajes directos se acumulan y algunos nunca se responden.',
          'Do you have vegetarian options? How late are you open? Is there parking? DMs pile up and some never get answered.')),
      p(b('Una carta difícil de encontrar', 'A menu that’s hard to find'),
        b('Si tu carta solo está en una foto dentro de una historia destacada, quien te busca en Google no la ve y no sabe si vale la pena ir.',
          'If your menu only lives in a photo inside an Instagram highlight, people searching on Google can’t see it and don’t know if it’s worth going.'))
    ],
    dayTitle: b('Un viernes cualquiera, <em>con el sistema</em>', 'Any given Friday, <em>with the system</em>'),
    day: [
      at(b('Viernes · 4:30 p. m.', 'Friday · 4:30 p.m.'), b('Alguien pregunta por Instagram si hay mesa para seis esta noche.', 'Someone asks on Instagram if there’s a table for six tonight.')),
      at(b('4:30 p. m.', '4:30 p.m.'), b('El agente revisa la disponibilidad, ofrece las 8:00 o las 8:30 y toma el nombre de la reserva.', 'The agent checks availability, offers 8:00 or 8:30 and takes the name for the booking.')),
      at(b('4:31 p. m.', '4:31 p.m.'), b('La reserva queda en el sistema y le llega la confirmación por WhatsApp.', 'The booking is saved and the guest gets a confirmation on WhatsApp.')),
      at(b('6:30 p. m.', '6:30 p.m.'), b('Recordatorio automático: el cliente confirma con un toque.', 'Automatic reminder: the guest confirms with one tap.')),
      at(b('8:00 p. m.', '8:00 p.m.'), b('El anfitrión ve en la lista del día quién llega, cuántos son y si es una celebración.', 'The host sees on the day’s list who is arriving, how many and whether it’s a celebration.'))
    ],
    dayNote: b('Ejemplo ilustrativo. Si el cliente cancela, la mesa vuelve a quedar disponible para otra reserva.',
               'Illustrative example. If the guest cancels, the table becomes available again for another booking.'),
    services: [
      sv('agendamiento', b('Reservas en línea y por chat, confirmaciones y recordatorios, y la lista del día para el salón.', 'Online and chat bookings, confirmations and reminders, and the day’s list for the floor.')),
      sv('agentes', b('Responde por Instagram y WhatsApp sobre la carta, horarios, ubicación y eventos, y toma la reserva.', 'Answers on Instagram and WhatsApp about the menu, hours, location and events, and takes the booking.')),
      sv('web', b('Una web con tu carta, fotos y reservas que Google sí puede leer y mostrar.', 'A website with your menu, photos and bookings that Google can actually read and show.'))
    ],
    costQ: b('¿Cuánto cuesta automatizar un restaurante?', 'How much does it cost to automate a restaurant?'),
    faq: [
      {q: b('¿El agente sabe qué hay en la carta?', 'Does the agent know what’s on the menu?'),
       a: b('Sí. Lo entrenamos con tu carta, precios, horarios y políticas, por ejemplo para grupos grandes o eventos, y responde solo con esa información.',
            'Yes. We train it on your menu, prices, hours and policies, for example for large groups or events, and it answers only with that information.')}
    ],
    waText: 'Hola, tengo un restaurante y quiero automatizar las reservas y los mensajes',
    ctaTitle: b('¿Cuánto de tu restaurante podría <em>funcionar solo</em>?', 'How much of your restaurant could <em>run on its own</em>?')
  },

  {
    key: 'tiendas-de-ropa',
    name: b('Tiendas de ropa', 'Clothing stores'),
    title: 'Agentes de IA para tiendas de ropa en Instagram y WhatsApp | Lazy Company',
    desc: 'Agentes de IA para Instagram y WhatsApp, CRM y seguimiento automático para tiendas de ropa y marcas de moda en Colombia: precios, tallas y envíos respondidos al instante. Precios de referencia en COP.',
    ogdesc: 'Precios, tallas y envíos respondidos al instante, y seguimiento a quien preguntó y no compró.',
    audience: 'Tiendas de ropa y marcas de moda',
    label: b('Para tiendas de ropa y marcas de moda', 'For clothing stores and fashion brands'),
    h1: b('Cada «¿precio?» y cada «¿hay en talla M?» <em>respondido al instante</em>', 'Every “price?” and every “do you have it in M?” <em>answered instantly</em>'),
    lead: b('Implementamos agentes de IA, CRM y seguimiento automático para tiendas de ropa en Colombia: el sistema responde precios, tallas y envíos por Instagram y WhatsApp, y vuelve a escribirle a quien preguntó y no compró.',
            'We implement AI agents, CRM and automatic follow-up for clothing stores in Colombia: the system answers prices, sizes and shipping on Instagram and WhatsApp, and writes again to whoever asked and didn’t buy.'),
    painsTitle: b('Lo que vive una tienda de ropa <em>todos los días</em>', 'What a clothing store deals with <em>every day</em>'),
    pains: [
      p(b('Los mismos mensajes todo el día', 'The same messages all day'),
        b('Precio, tallas, colores, envíos y medios de pago. Responder uno por uno ocupa a alguien de tiempo completo, y en un lanzamiento no da abasto.',
          'Price, sizes, colors, shipping and payment methods. Answering one by one takes someone full time, and during a launch it’s not enough.')),
      p(b('Ventas que se pierden por tardar', 'Sales lost to slow replies'),
        b('Quien pregunta por una prenda quiere saber ya. Si la respuesta llega horas después, ya compró en otra tienda.',
          'Whoever asks about a piece wants to know now. If the answer arrives hours later, they’ve already bought somewhere else.')),
      p(b('Interesados que nadie retoma', 'Interested buyers nobody follows up'),
        b('Muchos preguntan, dicen «lo pienso» y desaparecen. Nadie lleva la cuenta de a quién escribirle de nuevo.',
          'Many ask, say “I’ll think about it” and disappear. Nobody keeps track of who to write to again.')),
      p(b('Clientas que no se enteran de lo nuevo', 'Customers who miss what’s new'),
        b('Llega una colección y solo la ven quienes justo miran tus historias. Tus compradoras frecuentes no reciben un aviso propio.',
          'A new collection drops and only those who happen to watch your stories see it. Your regular buyers don’t get a message of their own.'))
    ],
    dayTitle: b('Un día de lanzamiento, <em>con el sistema</em>', 'A launch day, <em>with the system</em>'),
    day: [
      at(b('10:00 a. m.', '10:00 a.m.'), b('Publicas la nueva colección en Instagram.', 'You post the new collection on Instagram.')),
      at(b('10:03 a. m.', '10:03 a.m.'), b('Empiezan los mensajes: precio, tallas, envíos. El agente responde cada uno al momento, con la información que tú cargaste.', 'The messages start: price, sizes, shipping. The agent answers each one right away, with the information you loaded.')),
      at(b('10:05 a. m.', '10:05 a.m.'), b('Una clienta pide un vestido en talla M: el agente le da el total con envío y los medios de pago que tú definiste.', 'A customer asks for a dress in size M: the agent gives her the total with shipping and the payment methods you set.')),
      at(b('10:05 a. m.', '10:05 a.m.'), b('Su pedido y sus datos quedan en el CRM.', 'Her order and details are saved in the CRM.')),
      at(b('Al día siguiente', 'The next day'), b('A quien preguntó y no compró le llega un mensaje para retomar la conversación.', 'Whoever asked and didn’t buy gets a message to pick the conversation back up.'))
    ],
    dayNote: b('Ejemplo ilustrativo. El agente responde con la información de tallas y disponibilidad que tú le cargues.',
               'Illustrative example. The agent answers with the size and availability information you load into it.'),
    services: [
      sv('agentes', b('Responde mensajes directos y WhatsApp sobre precios, tallas, envíos y medios de pago, al momento y también de noche.', 'Answers DMs and WhatsApp about prices, sizes, shipping and payment methods, right away and at night too.')),
      sv('conversion', b('Vuelve a escribirle a quien preguntó y no compró, y avisa a tus clientas cuando hay novedades.', 'Writes again to whoever asked and didn’t buy, and lets your customers know when there’s something new.')),
      sv('crm', b('Tus compradoras en una sola lista, con lo que preguntaron y compraron, para venderles de nuevo.', 'Your buyers in a single list, with what they asked and bought, so you can sell to them again.'))
    ],
    costQ: b('¿Cuánto cuesta automatizar una tienda de ropa?', 'How much does it cost to automate a clothing store?'),
    faq: [
      {q: b('¿Puede decir si tengo una talla disponible?', 'Can it tell whether a size is in stock?'),
       a: b('Responde con la información de tallas y disponibilidad que tú le cargues. Para que consulte tu inventario en tiempo real hace falta una integración, que se evalúa en el nivel Integrado.',
            'It answers with the size and availability information you load. For it to check your inventory in real time, an integration is needed, which is assessed in the Integrated level.')}
    ],
    waText: 'Hola, tengo una tienda de ropa y quiero automatizar los mensajes de Instagram y WhatsApp',
    ctaTitle: b('¿Cuánto de tu tienda podría <em>funcionar sola</em>?', 'How much of your store could <em>run on its own</em>?')
  }
];
