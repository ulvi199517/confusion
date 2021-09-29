import { Card, CardImg, CardTitle, CardBody, CardText} from 'reactstrap';

const RenderDish =({dish}) => {
    return(
        <div  className="col-12 col-md-5 m-1">
            <Card key={dish.id}>
                <CardImg width='100%' top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>  
        </div>
    );
}
const RenderComments = ({comments}) => {
        if(comments != null)
        return(
            <div  className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                {
                    comments.map(comment => {
                        return(
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>
                                -- {comment.author}, 
                                {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                            </li>
                        )
                    })

                }
                </ul>
            </div>
        );
        else 
                return(
                    <div></div>
                );
}

const DishDetail = ({dish}) => {
        if(dish != null)
        return(
            <div  className="container">
                <div className='row'>
                    <RenderDish dish={dish} />
                    <RenderComments comments={dish.comments} />
                </div>
            </div>

        );
        else 
            return(
                <div></div>
            )
    
}
export default DishDetail;
