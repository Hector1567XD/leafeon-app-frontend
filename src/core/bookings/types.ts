import { ShortService } from "core/services/types"

export interface Booking {
  bookingId: number
  expeditionDate: string
  expirationDate: string
  clientDni: string
  licensePlate: string
  createdAt: string
  services: ShortService[]
}