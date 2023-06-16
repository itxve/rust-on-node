use napi_derive::napi;

#[napi]
fn eat(thin: String) {
  println!("I'am {}", thin);
}
