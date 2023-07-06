import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from "@reduxjs/toolkit"

type TGlobalState = {
  loading?: boolean
  version?: number
}

const initGlobalState: TGlobalState = {
  loading: false,
  version: 0,
}

export const ActSetGlobalState = createAction<number>(
  "setGlobalState" as const
) as ActionCreatorWithPayload<Partial<TGlobalState>>

export const globalReducer = createReducer(initGlobalState, (b) => {
  b.addCase(ActSetGlobalState, (s, action) => {
    Object.assign(s, action.payload)
    return s
  })
})
