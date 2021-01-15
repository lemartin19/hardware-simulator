import PropTypes from "prop-types";

export const SOURCE = "SOURCE";
export const NOT = "NOT";
export const AND = "AND";
export const OR = "OR";

export const ValueTypesPropType = PropTypes.oneOf([SOURCE, NOT, AND, OR]);
