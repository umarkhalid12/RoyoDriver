import { getBundleId } from "react-native-device-info";
import { appIds, shortCodes } from "../../utils/constants/DynamicAppKeys";

export const getAppCode = () => {
switch (getBundleId()) {
case appIds.royoDispatch: return shortCodes.royoDispatch;
case appIds.otgWeeds: return shortCodes.otgWeeds
case appIds.zamlift: return shortCodes.zamlift
case appIds.ordders: return shortCodes.ordders
case appIds.canadian: return shortCodes.canadian
case appIds.ethiopharma: return shortCodes.ethiopharma
case appIds.bola: return shortCodes.bola
case appIds.vors: return shortCodes.vors
case appIds.tejasTaxi: return shortCodes.tejasTaxi
case appIds.beautyDash: return shortCodes.beautyDash
case appIds.connect: return shortCodes.connect
case appIds.trucKaro: return shortCodes.trucKaro
case appIds.pide: return shortCodes.pide
case appIds.piolfix: return shortCodes.piolfix
case appIds.krownKouture: return shortCodes.krownKouture
case appIds.myPartyFood: return shortCodes.myPartyFood
case appIds.kruger: return shortCodes.kruger
case appIds.patazone: return shortCodes.patazone
case appIds.opera8: return shortCodes.opera8
case appIds.bistro: return shortCodes.bistro
case appIds.wow: return shortCodes.wow
case appIds.carrot: return shortCodes.carrot
case appIds.sharpex: return shortCodes.sharpex
case appIds.montra: return shortCodes.montra
case appIds.mundoLatino: return shortCodes.mundoLatino
case appIds.recovery: return shortCodes.recovery
case appIds.tryko: return shortCodes.tryko
case appIds.crestaPartner: return shortCodes.crestaPartner
case appIds.oneStop: return shortCodes.oneStop
case appIds.helloValet: return shortCodes.helloValet
case appIds.caribcraft: return shortCodes.caribcraft
case appIds.hometownDelivery: return shortCodes.hometownDelivery
case appIds.heyycab: return shortCodes.heyycab
case appIds.fasto: return shortCodes.fasto
case appIds.destinyMasters: return shortCodes.destinyMasters
case appIds.metroEats: return shortCodes.metroEats
case appIds.tride: return shortCodes.tride
case appIds.biteRoute: return shortCodes.biteRoute
case appIds.fadaa: return shortCodes.fadaa
case appIds.alrudo: return shortCodes.alrudo
case appIds.weeee: return shortCodes.weeee
case appIds.c7: return shortCodes.c7
case appIds.holoholo: return shortCodes.holoholo
case appIds.goCabDelivery: return shortCodes.goCabDelivery
case appIds.route: return shortCodes.route
case appIds.cheetah: return shortCodes.cheetah
case appIds.chomart: return shortCodes.chomart
case appIds.uKS: return shortCodes.uKS
case appIds.wazizo: return shortCodes.wazizo
case appIds.solarPrimex: return shortCodes.solarPrimex
case appIds.doortaq: return shortCodes.doortaq
case appIds.tripMechanics: return shortCodes.tripMechanics
case appIds.ahoy: return shortCodes.ahoy
case appIds.efharisto: return shortCodes.efharisto
case appIds.amba: return shortCodes.amba
case appIds.autoMaps: return shortCodes.autoMaps
case appIds.wahaLifestyle: return shortCodes.wahaLifestyle
case appIds.moveeCab: return shortCodes.moveeCab
case appIds.uRang: return shortCodes.uRang
case appIds.a2Z: return shortCodes.a2Z
case appIds.tod: return shortCodes.tod
case appIds.journeyman: return shortCodes.journeyman
default: return '1da2e9'
}
}