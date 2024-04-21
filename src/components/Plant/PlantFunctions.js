import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export function calculateNextWateringDate (from, to, initialDate) {
  const minCeiled = Math.ceil(from)
  const maxFloored = Math.floor(to)
  const days = Math.floor(
    Math.random() * (maxFloored - minCeiled + 1) + minCeiled
  )
  let nextDate = new Date(initialDate)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

export function usePlantsList () {
  return useSelector(state => state.userPlants.plants)
}
