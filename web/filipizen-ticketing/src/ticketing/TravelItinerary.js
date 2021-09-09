import React, { useState, useEffect } from "react";
import {
  Card,
  FormPanel,
  Panel,
  Title,
  Subtitle,
  Subtitle3,
  Checkbox,
  Date,
  Spacer,
  ActionBar,
  Button,
  BackLink,
  Error,
  useData,
  isDateBefore,
  isDateAfter,
  dateAdd,
  Service,
} from "rsi-react-web-components";

import { ACTIONS } from "./TerminalTicketWebController";

const TravelItinerary = ({
  title,
  partner,
  moveNextStep,
  movePrevStep,
}) => {
  const [ctx, dispatch] = useData();
  const [entity, setEntity] = useState({...ctx.entity});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [routeErrors, setRouteErrors] = useState([{},{}]);

  useEffect(() => {
    setLoading(true);
    const svc = Service.lookup(`${partner.id}:OnlineTicketingService`, "ticketing");
    svc.invoke("getRoutes", {}, (err, routes) => {
      if (err) {
        setError(err.toString());
      } else {
        dispatch({type: ACTIONS.SET_ROUTES, routes});
        setEntity({...entity, routes});
      }
      setLoading(false);
    })
  }, []);

  const validateTravel = () => {
    setError(null);
    const selectedIdx = entity.routes.findIndex(route => route.selected);
    if (selectedIdx < 0) {
      throw "Kindly select at least one (1) travel destination";
    }

    let hasError = false;
    const errors = entity.routes.map((route, idx) => {
      if (route.selected) {
        if (!route.traveldate) {
          hasError = true;
          return {error: "Travel date is required"};
        }
        if (idx == 0 && !isDateAfter(route.traveldate, dateAdd(-1))) {
          hasError = true;
          return {error: "Date must be on or after current date"}
        }
        if (idx == 1 && !isDateAfter(route.traveldate, dateAdd(-1))) {
          hasError = true;
          return {error: "Date must be on or after departure date"}
        }
        if (idx == 1 && entity.routes[0].selected && entity.routes[0].traveldate) {
          const entryDate = entity.routes[0].traveldate;
          const returnDate = route.traveldate;
          if (isDateBefore(returnDate, entryDate)) {
            hasError = true;
            return {error: "Date must be after " + entryDate}
          }
        }
      }
      return {error: null};
    })

    if (hasError) {
      setRouteErrors(errors);
      throw null;
    }
  }

  const onSubmit = () => {
    try {
      validateTravel();
      dispatch({type: "SET_ENTITY", entity});
      moveNextStep();
    } catch (err) {
      setError(err);
    }
  }

  if (loading) {
    return null;
  }

  return (
    <Card>
      <Title>{title}</Title>
      <Subtitle>Travel Itinerary</Subtitle>
      <Spacer />
      <FormPanel context={entity} handler={setEntity}>
        <Subtitle3>Issue QR Code for use in:</Subtitle3>
        <Error msg={error} />
        <Spacer height={10} />
        {entity.routes.map((route, idx) =>
          <Panel style={styles.itineraryContainer} key={route.objid}>
            <Checkbox caption={`${route.name}`} name={`routes[${idx}].selected`} />
            <Date
              name={`routes[${idx}].traveldate`}
              fullWidth={false}
              style={{width: 200}}
              placeholder="mm/dd/yyyy"
              variant="filled"
              error={routeErrors[idx].error}
              helperText={routeErrors[idx].error}
              readOnly={!entity.routes[idx].selected}
            />
          </Panel>
        )}
      </FormPanel>
      <ActionBar>
        <BackLink action={movePrevStep}/>
        <Button caption="Next" action={onSubmit} />
      </ActionBar>
    </Card>
  )
};

const styles = {
  itineraryContainer: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #aaa",
    padding: "0px 15px",
    marginBottom: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: 800,
    marginRight: 15,
  }
};

export default TravelItinerary;
