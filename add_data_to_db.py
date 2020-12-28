import requests
from pymongo import MongoClient
from decouple import config
import xml.etree.ElementTree as ET

URL = config("XML_URL")
DBCONNECTION = config("DBCONNECTION")
plantel_equipo = {}

response = requests.get(URL).content.decode("UTF-8")
document = ET.fromstring(response)

deporte = document.find("deporte")
plantel_equipo["deporte"] = {
    "id": deporte.attrib["id"],
    "deporte": deporte.text
}

categoria = document.find("categoria")
plantel_equipo["categoria"] = {
    "_id": categoria.attrib["id"],
    "canal": categoria.attrib["canal"],
    "categoria": categoria.text
}

campeonato = document.find("campeonato")
plantel_equipo["campeonato"] = {
    "_id": campeonato.attrib["id"],
    "campeonato": campeonato.text
}

campeonato_alternativo = document.find("campeonatoNombreAlternativo")
plantel_equipo["campeonatoNombreAlternativo"] = {
    "_id": campeonato_alternativo.attrib["id"],
    "campeonatoNombreAlternativo": campeonato_alternativo.text
}

plantel_equipo["fechaActual"] = {
    "fechaActual": document.find("fechaActual").text
}

equipos = []
for indice, equipo in enumerate(document.findall("equipo")):
    equipos += [{
        "_id": equipo.attrib["id"],
        "nombre": equipo.attrib["nombre"],
        "sigla": equipo.attrib["sigla"],
        "paisId": equipo.attrib["paisId"],
        "paisNombre": equipo.attrib["paisNombre"],
        "tipo": equipo.attrib["tipo"],
        "jugadores": {'cant': equipo.find('jugadores').attrib['cant'], 'jugador': []},
        "jugadoresDadosBaja": {'cant': equipo.find('jugadoresDadosBaja').attrib['cant'], 'jugador': []}
    }]
    jugadores = equipo.find('jugadores').findall('jugador')
    jugadoresDadosBaja = equipo.find('jugadoresDadosBaja').findall('jugador')
    for i, jugador in enumerate(jugadores):
        equipos[indice]["jugadores"]["jugador"] += [{
            "_id": jugador.attrib['id'],
            'nombre': jugador.find('nombre').text,
            'apellido': jugador.find('apellido').text,
            'nombreCorto': jugador.find('nombreCorto').text,
            'ladoHabil': jugador.find('ladoHabil').text,
            'fechaNacimiento': jugador.find('fechaNacimiento').text,
            'horaNacimiento': jugador.find('horaNacimiento').text,
            'edad': jugador.find('edad').text,
            'peso': jugador.find('peso').text,
            'altura': jugador.find('altura').text,
            'apodo': jugador.find('apodo').text,
            'rol': { '_id': jugador.find('rol').attrib['idRol'], 'rol': jugador.find('rol').text},
            'camiseta': jugador.find('camiseta').text,
            'pais': {'_id': jugador.find('pais').attrib['paisId'], 'pais': jugador.find('pais').text},
            'provincia': jugador.find('provincia').text,
            'clubActual': {
                '_id': jugador.find('clubActual').attrib['id'],
                'paisId': jugador.find('clubActual').attrib['paisId'],
                'paisNombre': jugador.find('clubActual').attrib['paisNombre'],
                'paisSigla': jugador.find('clubActual').attrib['paisSigla'],
                'tipo': jugador.find('clubActual').attrib['tipo']
            },
            'localidad': jugador.find('localidad').text,
        }]
    for j, jugadorDeBaja in enumerate(jugadoresDadosBaja):
        equipos[indice]["jugadoresDadosBaja"]["jugador"] += [{
            "_id": jugadorDeBaja.attrib['id'],
            'nombre': jugadorDeBaja.find('nombre').text,
            'apellido': jugadorDeBaja.find('apellido').text,
            'nombreCorto': jugadorDeBaja.find('nombreCorto').text,
            'fechaBaja': jugadorDeBaja.find('fechaBaja').text,
            'ladoHabil': jugadorDeBaja.find('ladoHabil').text,
            'fechaNacimiento': jugadorDeBaja.find('fechaNacimiento').text,
            'horaNacimiento': jugadorDeBaja.find('horaNacimiento').text,
            'peso': jugadorDeBaja.find('peso').text,
            'altura': jugadorDeBaja.find('altura').text,
            'apodo': jugadorDeBaja.find('apodo').text,
            'rol': { '_id': jugadorDeBaja.find('rol').attrib['idRol'], 'rol': jugadorDeBaja.find('rol').text},
            'camiseta': jugadorDeBaja.find('camiseta').text,
            'pais': {'_id': jugadorDeBaja.find('pais').attrib['paisId'], 'pais': jugadorDeBaja.find('pais').text},
            'provincia': jugadorDeBaja.find('provincia').text,
            'clubActual': {
                '_id': jugadorDeBaja.find('clubActual').attrib['id'],
                'paisId': jugadorDeBaja.find('clubActual').attrib['paisId'],
                'paisNombre': jugadorDeBaja.find('clubActual').attrib['paisNombre'],
                'paisSigla': jugadorDeBaja.find('clubActual').attrib['paisSigla'],
                'tipo': jugadorDeBaja.find('clubActual').attrib['tipo']
            },
            'localidad': jugadorDeBaja.find('localidad').text,
        }]

# Conexión al cluster
cliente = MongoClient(DBCONNECTION)
db = cliente["plantelEquipo"]
# equipos_ingresados = db["equipos"].insert_many(equipos)
# plantel_equipo["equipos"] = equipos_ingresados.inserted_ids
# db["plantelEquipo"].insert_one(plantel_equipo)

# Insertamos
plantel_equipo["equipos"] = equipos
collection = db["plantelEquipo"]
collection.insert_one(plantel_equipo)

