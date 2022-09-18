export default function FilterWrapper({ children, filterDisplay }) {
	if (filterDisplay) {
		return <div className="filter-wrapper">{children}</div>;
	} else {
		return null;
	}
}
