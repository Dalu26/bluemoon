// import { useProduct, productReducer } from '../src/context/providers/ProductContext';

// interface ItemProps {
//     name?: string,
//     price?: number,
//     totalStock?: number,
//     description?: string
// }

// describe('create CRUD tests for async storage', () => {
//     const { state, productDispatch } = useProduct();
//   const item: ItemProps = {
//     price: 10,
//     totalStock: 25,
//     name: 'Cheese',
//     description: 'sweet cheese for sale',
//   };
//   it('create product', () => {
//     expect(
//       productReducer(state, productDispatch({type: 'update_inventory', payload: [item]})),
//     ).toEqual({
//       inventory: [item]
//     });
//   });
//   it('update product', () => {
//     expect(
//       productReducer(
//         {inventory: [item]},
//         productDispatch({type: 'set_inventory',
//           payload: new Set([item]),
//         }),
//       ),
//     ).toEqual({inventory: [item]});
//   });
//   it('delete product', () => {
//     expect(
//       productReducer(
//         {inventory: [item]},
//         productDispatch({type: 'clear_inventory'}),
//       ),
//     ).toEqual([]);
//   });
// });