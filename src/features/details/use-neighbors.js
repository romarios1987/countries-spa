import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadNeighborsByBorder, selectNeighbors } from './details-slice'

export const useNeighbors = (borders) => {
	const dispatch = useDispatch()
	useEffect(() => {
		if (borders.length) {
			dispatch(loadNeighborsByBorder(borders))
		}
	}, [borders, dispatch])

	const neighbors = useSelector(selectNeighbors)

	return neighbors
}
