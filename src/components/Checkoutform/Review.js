/* eslint-disable no-unused-vars */
import { Typography, List, ListItem, ListItemText } from 'material-ui-core';
import { useStateValue } from '../../StateProvider';
import { getBasketTotal } from '../../reducer';
import accounting from "accounting";

const Review = () => {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Resumen del pedido
      </Typography>
      <List dissablePadding>
        {
          basket?.map(product => (
            <ListItem key={product.name}>
              <ListItemText primary={product.name} secondary={'Qty : {1}'} />
              <Typography variant="body2">
                {accounting.formatMoney(product.price, "$")}
              </Typography>
            </ListItem>
          ))
        }
        <ListItem>

          <ListItemText
            primary="Total" />
          <Typography variant="h6"  >
            {accounting.formatMoney(getBasketTotal(basket), "$")}
          </Typography>
        </ListItem>

      </List>
    </>
  )
}

export default Review
