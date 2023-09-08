import './styleInfo.css'

const InfoButton = () => {
   
    return (
    <div className='inplace'>
<link href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"></link>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"></link>
    <div className="col-md-3">
    <div className="info" onClick={() => {
        window.location.href='/info'
         }}>
      <i className="icon-info-sign"></i>
      <span className="extra-info">
        Click here to know more
      </span>
    </div><br />
  {/* <span>Hover me!</span> */}
    </div>
</div>
    )
  }
export default InfoButton