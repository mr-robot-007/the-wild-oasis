import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error();
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  // console.log("Add API executed");

  // need to check if image has image path, or image object fileList(i.e incase new image is uploaded)
  // if image has supabase url in it means it has image path, else it is fileList of image Object.
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit Cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error();
    throw new Error("Cabin could not be added");
  }

  // https://hvtjlffeippxnsjqjjgt.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // 2.  upload image if cabin is succesfully created
  // if image is already there at storage , dont reupload it. (hasImagepath - image is url means it is already there)
  if (hasImagePath) {
    return data;
  }
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin If there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    if (error) {
      console.error();
      throw new Error(
        "Cabin Image Couldn't be Uploaded & Cabin wasn't created"
      );
    }
  }
  return data;
}

export async function deleteCabin(id) {
  // console.log("Delete API executed");
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error();
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
