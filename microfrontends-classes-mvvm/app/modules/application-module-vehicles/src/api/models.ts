export interface Vehicle {
  id: number
  brand: string
  model: string
  version: string
  helpUrl: string
  imageUrl: string
  category: string
  chargeCurve: string
  connectorType: string
  chargeSpeedInKw: number
  recommendedCharger: string
  autochargeCapable: boolean
  notes?: {
    id: number
    title: string
    description: string
    vehicleTypeId: number
  }[]
  externalParameters: {
    typecode: string
    fast_chargers: string
    ref_consumption: string | number
    usable_battery_wh: string | number
  }
}
