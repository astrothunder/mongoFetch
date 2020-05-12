import {createSelector} from 'reselect';

export const menuSelector = state => state.menuItems.menu;

// const sortedOrdersSelector = createSelector(
//     ordersSelector,
//     orders => orders.sort()
// )
