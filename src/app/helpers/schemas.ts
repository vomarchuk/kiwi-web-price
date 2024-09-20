import React from "react";
import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  categoryId: z.string(),
  time: z.string(),
})


export type ServiceType = z.infer<typeof serviceSchema>