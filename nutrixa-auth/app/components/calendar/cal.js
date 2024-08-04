export default function cal(...classes) {
	return classes.filter(Boolean).join(" ");
}