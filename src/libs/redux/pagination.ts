import { CaseReducer, createAction, createReducer } from "@reduxjs/toolkit"

type SingleState = { limit: number; offset: number; total: number }

type PaginationState = {
  pagination: {
    [key: string]: SingleState
  }
}

const initialState: PaginationState = {
  pagination: {},
}
export const defaultPagination = {
  limit: 10,
  offset: 0,
  total: 0,
}

export const ActPageNext = createAction<{ key: string }>("[Pagination]NextPage")
export const ActPagePrev = createAction<{ key: string }>("[Pagination]PrevPage")
export const ActPageGoTo = createAction<{ key: string; goto: number }>(
  "[Pagination]GoToPage"
)
export const ActPageSetInfo = createAction<{
  key: string
  size?: number
  total?: number
}>("[Pagination]SetSize")

const gotoReducer: CaseReducer<
  PaginationState,
  ReturnType<typeof ActPageGoTo>
> = (s, action) => {
  const key = action.payload.key
  const offset =
    (action.payload.goto - 1) *
    (s.pagination[key]?.limit ?? defaultPagination.limit)
  const cur = s.pagination[key]
  if (cur) {
    s.pagination[key] = {
      ...cur,
      offset,
    }
    return
  }
  s.pagination[key] = {
    limit: 15,
    offset,
    total: 0,
  }
  return s
}
function GetCurPage(s?: SingleState) {
  if (s) {
    return Math.floor(s.offset / s.limit) + 1
  }
  return 1
}

export const paginationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActPageNext, (s, action) => {
      return gotoReducer(s, {
        payload: {
          key: action.payload.key,
          goto: GetCurPage(s.pagination[action.payload.key]) + 1,
        },
        type: action.type,
      })
    })
    .addCase(ActPagePrev, (s, action) => {
      const nextPage = GetCurPage(s.pagination[action.payload.key]) - 1
      return gotoReducer(s, {
        payload: {
          key: action.payload.key,
          goto: nextPage > 0 ? nextPage : 1,
        },
        type: action.type,
      })
    })
    .addCase(ActPageGoTo, (s, action) => {
      const nextPage = action.payload.goto
      return gotoReducer(s, {
        payload: {
          key: action.payload.key,
          goto: nextPage,
        },
        type: action.type,
      })
    })
    .addCase(ActPageSetInfo, (s, action) => {
      const cur = s.pagination[action.payload.key]
      if (cur) {
        s.pagination[action.payload.key] = {
          ...cur,
          limit: action.payload.size ?? cur.limit,
          total: action.payload.total ?? cur.total,
        }
        return
      }
      s.pagination[action.payload.key] = {
        offset: 0,
        limit: action.payload.size ?? defaultPagination.limit,
        total: 0,
      }
    })
})
