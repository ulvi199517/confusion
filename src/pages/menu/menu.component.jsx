import { Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

const RenderMenuItem = ({dish, onClick}) => {
  return(
    <Card onClick={() => onClick(dish.id)}>
    <CardImg width="100%" src={dish.image} alt={dish.name} />
    <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
    </CardImgOverlay>
  </Card>
  );
}
const Menu = (props) => {
  const {dishes} = props;
  return (
      <div className="container">
          <div className="row">
              {
                dishes.map((dish) => {
                  return (
                    <div key={dish.id} className="col-12 col-md-5 m-1">
                      <RenderMenuItem dish={dish} onClick={props.onClick} />
                    </div>
                  );
              })
              }
          </div>
      </div>
  );
}
export default Menu;